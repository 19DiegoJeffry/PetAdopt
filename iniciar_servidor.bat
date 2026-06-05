@echo off
REM Script para iniciar servidor HTTP local y abrir la página
REM Requiere Python 3 instalado

echo.
echo ================================================
echo  PetAdopt - Iniciando servidor local
echo ================================================
echo.

REM Cambiar a la carpeta del proyecto
cd /d "%~dp0"

REM Verificar si Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python no está instalado o no está en PATH
    echo.
    echo Instalaciones alternativas:
    echo 1. Instala Python desde https://www.python.org/
    echo 2. Asegúrate de marcar "Add Python to PATH"
    echo 3. Reinicia la terminal y vuelve a intentar
    echo.
    pause
    exit /b 1
)

echo Iniciando servidor en http://localhost:8000
echo Presiona Ctrl+C para detener el servidor
echo.

REM Iniciar servidor HTTP en puerto 8000
python -m http.server 8000

pause
