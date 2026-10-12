@echo off
echo ========================================================
echo   TechVault - Teknoloji E-Ticaret Platformu Baslatiliyor
echo ========================================================
echo.

echo 1. PostgreSQL Docker Konteyneri Baslatiliyor...
docker compose up -d

echo.
echo 2. Backend (Spring Boot) yeni pencerede baslatiliyor...
start "TechVault Backend (Spring Boot 8080)" cmd /k "cd backend && mvn spring-boot:run"

echo.
echo 3. Frontend (Next.js) yeni pencerede baslatiliyor...
start "TechVault Frontend (Next.js 3000)" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo   Platform Hazirlaniyor!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8080
echo ========================================================
