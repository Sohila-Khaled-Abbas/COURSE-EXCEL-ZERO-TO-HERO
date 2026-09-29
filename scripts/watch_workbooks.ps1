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
Write-Host " [ACTIVE] Excel Workbook Auto-Publisher Running" -ForegroundColor Green
Write-Host " [PATH]   Monitoring: $resolvedTarget" -ForegroundColor Yellow
Write-Host " [DEBOUNCE] Interval: $DebounceSeconds seconds" -ForegroundColor Gray
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
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [DETECTED] $name ($($event.ChangeType))" -ForegroundColor Magenta
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
            
            # Rebuild site docs if site generator exists
            if (Test-Path "$RepoRoot\site\build.js") {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [BUILD] Synchronizing documentation site & search index..." -ForegroundColor Cyan
                node "$RepoRoot\site\build.js" 2>&1 | Out-Null
            }

            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [SYNC] Staging workbooks, notes, and docs to git..." -ForegroundColor Cyan
            git add -A -- ":(exclude)09_Source_Materials" ":(exclude)assets/*.mp4" ":(exclude).obsidian/workspace*" ":(exclude)*/node_modules/*" ":(exclude)*/dist/*" ":(exclude)*.cache*"
            
            # Check if there are staged changes
            $staged = git diff --cached --name-only
            if ($staged) {
                $file = $global:lastModifiedFile
                $commitMsg = "feat(workbooks): update $file [$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')]"
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
    Write-Host "[STOPPED] Watcher stopped." -ForegroundColor Red
}
