@echo off
title Stop Auto-Publisher
color 0C
echo Terminating running auto-publisher instances...
powershell -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*watch_autopublish.ps1*' -or $_.CommandLine -like '*watch_workbooks.ps1*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force; Write-Host 'Stopped auto-publisher process ID:' $_.ProcessId }"
echo Done.
timeout /t 3
