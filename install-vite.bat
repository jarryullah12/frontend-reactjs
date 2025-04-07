@echo off
echo Installing Vite locally...
call npm install vite --save-dev
echo.
echo Installing other dependencies...
call npm install
echo.
echo Starting the development server using npx...
call npx vite
echo.
pause 