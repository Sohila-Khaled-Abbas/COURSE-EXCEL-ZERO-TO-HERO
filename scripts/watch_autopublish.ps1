# ==============================================================================
# Dynamic Repository Auto-Publisher (Continuous Background Sync)
# Automatically commits and pushes changes to GitHub whenever files are updated
# ==============================================================================

param(
    [string]$RepoPath = "$PSScriptRoot\..",
    [int]$DebounceSeconds = 4
)

$RepoRoot = (Resolve-Path $RepoPath).Path
Set-Location $RepoRoot

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " 🚀 Continuous Repository Auto-Publisher Active" -ForegroundColor Green
Write-Host " 📂 Watching Repository: $RepoRoot" -ForegroundColor Yellow
Write-Host " ⏱️  Debounce interval: $DebounceSeconds seconds" -ForegroundColor Gray
Write-Host " Press Ctrl+C to terminate auto-publisher." -ForegroundColor DarkGray
Write-Host "==========================================================" -ForegroundColor Cyan

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $RepoRoot
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$global:pendingChanges = $false
$global:lastModifiedFile = ""

# Filter regex for ignored paths/files
$ignorePattern = '(\.git[\\/]|\.obsidian[\\/](workspace|cache)|09_Source_Materials[\\/]|assets[\\/].*\.mp4|~$|\.tmp$|\.bak$)'

$action = {
    param($source, $event)
    $fullPath = $event.FullPath
    $relPath = $fullPath.Replace($RepoRoot, "").TrimStart("\/")

    if ($relPath -match $ignorePattern) {
        return
    }

    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 📝 Change detected: $relPath ($($event.ChangeType))" -ForegroundColor Magenta
    $global:pendingChanges = $true
    $global:lastModifiedFile = $relPath
}

$subChanged = Register-ObjectEvent $watcher "Changed" -Action $action
$subCreated = Register-ObjectEvent $watcher "Created" -Action $action
$subRenamed = Register-ObjectEvent $watcher "Renamed" -Action $action
$subDeleted = Register-ObjectEvent $watcher "Deleted" -Action $action

try {
    while ($true) {
        Start-Sleep -Seconds 2
        if ($global:pendingChanges) {
            # Debounce: wait for Excel or Obsidian to finish writing/releasing file locks
            Start-Sleep -Seconds $DebounceSeconds
            $global:pendingChanges = $false

            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 🔄 Staging updates to Git..." -ForegroundColor Cyan
            git add -A -- ":(exclude)09_Source_Materials" ":(exclude)assets/*.mp4" ":(exclude).obsidian/workspace*"

            $staged = git diff --cached --name-only
            if ($staged) {
                $targetName = $global:lastModifiedFile
                if (-not $targetName) { $targetName = "workspace files" }
                $commitMsg = "feat(auto-sync): update $targetName [$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')]"

                git commit -m $commitMsg
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 📦 Committed: $commitMsg" -ForegroundColor Green

                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ⬆️  Pushing to GitHub (origin main)..." -ForegroundColor Yellow
                $pushOutput = git push origin main 2>&1
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 🎉 Successfully published to GitHub!" -ForegroundColor Green
                } else {
                    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ⚠️ Push notice: $pushOutput" -ForegroundColor Red
                }
            } else {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ℹ️ No new changes to commit." -ForegroundColor DarkGray
            }
        }
    }
}
finally {
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    Unregister-Event -SourceIdentifier $subChanged.Name -ErrorAction SilentlyContinue
    Unregister-Event -SourceIdentifier $subCreated.Name -ErrorAction SilentlyContinue
    Unregister-Event -SourceIdentifier $subRenamed.Name -ErrorAction SilentlyContinue
    Unregister-Event -SourceIdentifier $subDeleted.Name -ErrorAction SilentlyContinue
    Write-Host "🛑 Repository auto-publisher stopped." -ForegroundColor Red
}
