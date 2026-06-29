@echo off
cd /d "%~dp0"
echo Installing server dependencies...
cd /d apps\server
call npm install
echo.
echo Installing client dependencies...
cd /d %~dp0apps\client
call npm install
echo.
echo Building client...
call npx vite build
echo.
echo Setup complete.
pause
