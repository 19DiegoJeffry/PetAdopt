@echo off
REM Script de inicio rápido para PetAdopt

echo.
echo ====================================
echo   🐾 PetAdopt - Página de Adopción
echo ====================================
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    echo Descárgalo desde: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js detectado
node --version
echo.

REM Instalar dependencias
echo Instalando dependencias...
call npm install

if errorlevel 1 (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo.
echo ✅ Dependencias instaladas correctamente
echo.
echo Iniciando servidor...
echo 🐾 Servidor disponible en: http://localhost:5000
echo.
echo Abre index.html en tu navegador
echo.

REM Iniciar servidor
node server.js

pause
