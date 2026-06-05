#!/bin/bash
# Script de inicio para sistemas Linux/Mac

echo ""
echo "===================================="
echo "   🐾 PetAdopt - Página de Adopción"
echo "===================================="
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "Descárgalo desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detectado"
node --version
echo ""

# Instalar dependencias
echo "Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo ""
echo "✅ Dependencias instaladas correctamente"
echo ""
echo "Iniciando servidor..."
echo "🐾 Servidor disponible en: http://localhost:5000"
echo ""
echo "Abre index.html en tu navegador"
echo ""

# Iniciar servidor
node server.js
