@echo off
echo 기존 Node 프로세스 종료 중...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

echo 서버 시작 중...
start "Express Server" cmd /k "node server.js"
timeout /t 1 >nul
start "Vite Dev" cmd /k "npm run dev"
echo 완료! 잠시 후 http://localhost:3000 에서 확인하세요.
