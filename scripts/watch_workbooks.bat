@echo off
title Dynamic Excel Workbook Auto-Publisher
color 0A
echo ==========================================================
echo  Starting Dynamic Excel Workbook Auto-Publisher...
echo ==========================================================
powershell -NoProfile -ExecutionPolicy Bypass -Command "& '%~dp0watch_workbooks.ps1'"
pause
