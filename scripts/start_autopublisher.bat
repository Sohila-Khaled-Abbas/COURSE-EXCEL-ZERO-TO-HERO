@echo off
title Excel & Repository Dynamic Auto-Publisher
color 0A
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0watch_autopublish.ps1"
pause
