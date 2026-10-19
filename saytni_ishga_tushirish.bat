@echo off
title Dood Food Server
echo ============================================
echo   Dood Food Bektemir - Server ishga tushmoqda...
echo ============================================
echo.
start "" cmd /c "timeout /t 2 >nul & start http://localhost:5173/"
call npm.cmd run dev
pause