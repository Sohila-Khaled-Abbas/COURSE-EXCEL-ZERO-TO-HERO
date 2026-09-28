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

# Stage workbooks folder
git add "11_Demos_and_Workbooks"

# Check diff
$staged = git diff --cached --name-only "11_Demos_and_Workbooks"
if ($staged) {
    Write-Host "📝 Staged the following workbooks:" -ForegroundColor Yellow
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
