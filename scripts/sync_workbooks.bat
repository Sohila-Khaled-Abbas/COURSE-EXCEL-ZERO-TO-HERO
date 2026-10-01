@echo off
title One-Click Excel Workbook GitHub Synchronizer
color 0B
powershell -NoProfile -ExecutionPolicy Bypass -Command "& '%~dp0sync_workbooks.ps1'"
pause
