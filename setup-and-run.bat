@echo off
REM Script automático para configurar token y ejecutar chatbot
REM Este archivo: setup-and-run.bat

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║   🤖 CHATBOT IA - CONFIGURACIÓN Y INICIO AUTOMÁTICO        ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    echo.
    echo Descárgalo desde: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js detectado
echo.

REM Verificar si node_modules existe
if not exist "node_modules\" (
    echo 📦 Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo ❌ Error al instalar dependencias
        pause
        exit /b 1
    )
    echo ✅ Dependencias instaladas
    echo.
)

REM Verificar si .env existe
if not exist ".env" (
    echo ⚠️  Archivo .env no encontrado
    echo.
    echo 1️⃣  Ejecutando configuración de token...
    echo.
    call node setup-token-simple.js
    echo.
) else (
    echo ✅ Archivo .env ya existe
    echo.
)

REM Iniciar servidor
echo 🚀 Iniciando servidor...
echo.
echo ┌────────────────────────────────────────────────────────────┐
echo │ El servidor estará disponible en: http://localhost:5000   │
echo │ Abre index.html en tu navegador para usar el chatbot       │
echo │ Presiona Ctrl+C para detener el servidor                  │
echo └────────────────────────────────────────────────────────────┘
echo.

call npm start

pause
