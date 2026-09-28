@echo off
title One-Click Excel Workbook GitHub Synchronizer
color 0B
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync_workbooks.ps1"
pause
