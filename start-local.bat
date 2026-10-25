@echo off
title GulfCV Match - Local Server
echo =======================================================
echo          Starting GulfCV Match Local App
echo =======================================================
echo Opening browser at http://localhost:4173 ...
timeout /t 2 /nobreak >nul
start http://localhost:4173
npm.cmd run preview -- --port 4173
pause
