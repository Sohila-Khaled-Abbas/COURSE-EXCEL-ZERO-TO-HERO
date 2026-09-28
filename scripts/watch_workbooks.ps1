# ==============================================================================
# Dynamic Excel Workbook Auto-Publisher (GitHub Sync Watcher)
# Monitors 11_Demos_and_Workbooks for changes and automatically pushes to GitHub
# ==============================================================================

param(
    [string]$TargetFolder = "$PSScriptRoot\..\11_Demos_and_Workbooks",
    [int]$DebounceSeconds = 4
)

$RepoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $RepoRoot

$resolvedTarget = (Resolve-Path $TargetFolder).Path
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " 🚀 Dynamic Excel Workbook Auto-Publisher Started" -ForegroundColor Green
Write-Host " 📂 Monitoring: $resolvedTarget" -ForegroundColor Yellow
Write-Host " ⏱️  Debounce interval: $DebounceSeconds seconds" -ForegroundColor Gray
Write-Host " Press Ctrl+C to stop watching." -ForegroundColor DarkGray
Write-Host "==========================================================" -ForegroundColor Cyan

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $resolvedTarget
$watcher.Filter = "*.xlsx"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$global:pendingChanges = $false
$global:lastModifiedFile = ""

$action = {
    param($source, $event)
    $name = $event.Name
    # Ignore temporary Excel lock files and temporary files
    if ($name -match '^[~]|\.tmp$') {
        return
    }
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 📝 Detected change: $name ($($event.ChangeType))" -ForegroundColor Magenta
    $global:pendingChanges = $true
    $global:lastModifiedFile = $name
}

$subChanged = Register-ObjectEvent $watcher "Changed" -Action $action
$subCreated = Register-ObjectEvent $watcher "Created" -Action $action
$subRenamed = Register-ObjectEvent $watcher "Renamed" -Action $action

try {
    while ($true) {
        Start-Sleep -Seconds 2
        if ($global:pendingChanges) {
            # Debounce: wait for Excel to release file lock
            Start-Sleep -Seconds $DebounceSeconds
            $global:pendingChanges = $false
            
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 🔄 Staging changes to git..." -ForegroundColor Cyan
            git add "11_Demos_and_Workbooks"
            
            # Check if there are staged changes
            $staged = git diff --cached --name-only
            if ($staged) {
                $file = $global:lastModifiedFile
                $commitMsg = "feat(workbooks): update $file [$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')]"
                git commit -m $commitMsg
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 📦 Committed: $commitMsg" -ForegroundColor Green
                
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ⬆️  Pushing to GitHub (origin main)..." -ForegroundColor Yellow
                $pushOutput = git push origin main 2>&1
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ✅ Successfully published to GitHub!" -ForegroundColor Green
                } else {
                    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ⚠️ Push failed or timed out: $pushOutput" -ForegroundColor Red
                }
            } else {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ℹ️ No changes detected to commit." -ForegroundColor DarkGray
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
    Write-Host "🛑 Watcher stopped." -ForegroundColor Red
}
