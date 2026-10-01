# ==============================================================================
# One-Click Excel Workbook GitHub Synchronizer
# Immediately commits and pushes any modified .xlsx files in 11_Demos_and_Workbooks
# ==============================================================================

param(
    [string]$TargetFolder = "$PSScriptRoot\..\11_Demos_and_Workbooks"
)

$RepoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $RepoRoot

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " 📦 One-Click Workbook GitHub Synchronizer" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

# Synchronize workbook documentation
Write-Host "🔄 Synchronizing workbook documentation..." -ForegroundColor Magenta
if (Test-Path "$RepoRoot\scripts\sync_module_6_docs.py") { python "$RepoRoot\scripts\sync_module_6_docs.py" 2>&1 | Out-Null }
if (Test-Path "$RepoRoot\scripts\sync_module_7_docs.py") { python "$RepoRoot\scripts\sync_module_7_docs.py" 2>&1 | Out-Null }
if (Test-Path "$RepoRoot\scripts\sync_module_8_docs.py") { python "$RepoRoot\scripts\sync_module_8_docs.py" 2>&1 | Out-Null }

# Rebuild site docs if generator exists
if (Test-Path "$RepoRoot\site\build.js") {
    Write-Host "🔨 Rebuilding documentation site & search index..." -ForegroundColor Cyan
    node "$RepoRoot\site\build.js" 2>&1 | Out-Null
}

# Stage workbooks folder and documentation
git add -A -- ":(exclude)09_Source_Materials" ":(exclude)assets/*.mp4" ":(exclude).obsidian/workspace*" ":(exclude)*/node_modules/*" ":(exclude)*/dist/*" ":(exclude)*.cache*"

# Check diff
$staged = git diff --cached --name-only
if ($staged) {
    Write-Host "📝 Staged the following updates:" -ForegroundColor Yellow
    $staged | ForEach-Object { Write-Host "   - $_" -ForegroundColor White }
    
    $commitMsg = "feat(workbooks): manual sync [$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')]"
    git commit -m $commitMsg
    Write-Host "✅ Committed: $commitMsg" -ForegroundColor Green
    
    Write-Host "⬆️  Pushing to GitHub (origin main)..." -ForegroundColor Yellow
    $pushOutput = git push origin main 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "🎉 Successfully published to GitHub repository!" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Push encountered an issue: $pushOutput" -ForegroundColor Red
    }
} else {
    Write-Host "✨ All workbooks are already up to date with Git. No changes to push." -ForegroundColor Green
}

Write-Host "==========================================================" -ForegroundColor Cyan
