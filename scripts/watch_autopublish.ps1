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
Write-Host " [ACTIVE] Continuous Repository Auto-Publisher Running" -ForegroundColor Green
Write-Host " [PATH]   Watching Repository: $RepoRoot" -ForegroundColor Yellow
Write-Host " [DEBOUNCE] Interval: $DebounceSeconds seconds" -ForegroundColor Gray
Write-Host " Press Ctrl+C to terminate auto-publisher." -ForegroundColor DarkGray
Write-Host "==========================================================" -ForegroundColor Cyan

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $RepoRoot
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$global:pendingChanges = $false
$global:lastModifiedFile = ""

# Filter regex for ignored paths/files
$ignorePattern = '(^|[\\/])\.git([\\/]|$)|(node_modules|site[\\/](node_modules|dist|\.astro|\.cache)|dist|\.cache|\.obsidian[\\/](workspace|cache)|09_Source_Materials|assets[\\/].*\.mp4|~$|\.tmp$|\.bak$)'

$action = {
    param($source, $event)
    $fullPath = $event.FullPath
    $relPath = $fullPath.Replace($RepoRoot, "").TrimStart("\/")

    if ($relPath -eq ".git" -or $relPath.StartsWith(".git\") -or $relPath.StartsWith(".git/") -or $relPath -match $ignorePattern) {
        return
    }

    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [DETECTED] $relPath ($($event.ChangeType))" -ForegroundColor Magenta
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
            # Debounce: wait for Excel or editor to release file locks
            Start-Sleep -Seconds $DebounceSeconds
            $global:pendingChanges = $false

            # Rebuild site docs if site generator exists
            if (Test-Path "$RepoRoot\site\build.js") {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [BUILD] Synchronizing documentation site & search index..." -ForegroundColor Cyan
                node "$RepoRoot\site\build.js" 2>&1 | Out-Null
            }

            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [SYNC] Staging updates to Git..." -ForegroundColor Cyan
            git add -A -- ":(exclude)09_Source_Materials" ":(exclude)assets/*.mp4" ":(exclude).obsidian/workspace*" ":(exclude)*/node_modules/*" ":(exclude)*/dist/*" ":(exclude)*.cache*"

            $staged = git diff --cached --name-only
            if ($staged) {
                $targetName = $global:lastModifiedFile
                if (-not $targetName) { $targetName = "workspace files" }
                $commitMsg = "feat(auto-sync): update $targetName [$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')]"

                git commit -m $commitMsg
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [COMMITTED] $commitMsg" -ForegroundColor Green

                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [PUSHING] Uploading to GitHub (origin main)..." -ForegroundColor Yellow
                $pushOutput = git push origin main 2>&1
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [SUCCESS] Published to GitHub!" -ForegroundColor Green
                } else {
                    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [WARNING] Push notice: $pushOutput" -ForegroundColor Red
                }
            } else {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [NO-CHANGE] No changes to commit." -ForegroundColor DarkGray
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
    Write-Host "[STOPPED] Repository auto-publisher stopped." -ForegroundColor Red
}
