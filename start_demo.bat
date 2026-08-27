@echo off
echo ===================================================
echo     LIQUID CHECKOUT - HACKATHON DEMO LAUNCHER
echo ===================================================
echo.
echo [1/2] Starting Python FastAPI Backend...
start cmd /k "cd backend && .\venv\Scripts\Activate && uvicorn main:app --reload --port 8000"

echo [2/2] Starting Next.js Frontend...
start cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting up! 
echo A browser window will open automatically in 5 seconds...
timeout /t 5 /nobreak > nul
start http://localhost:3000
