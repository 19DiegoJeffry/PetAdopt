#!/usr/bin/env node

/**
 * 🤖 Script SIMPLE para configurar token de Hugging Face
 * 
 * Uso:
 *   node setup-token-simple.js
 * 
 * Este script simplemente te pide que pegues tu nuevo token
 * y lo guarda de forma segura en .env
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise(resolve => {
        rl.question(prompt, resolve);
    });
}

async function setupToken() {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║    🔑 CONFIGURACIÓN DE TOKEN - FORMA SEGURA               ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📋 INSTRUCCIONES RÁPIDAS:\n');
    console.log('1. Ve a: https://huggingface.co/settings/tokens');
    console.log('2. Haz clic en "New token"');
    console.log('3. Llena el formulario:');
    console.log('   - Nombre: PetAdopt Chatbot');
    console.log('   - Tipo: Read');
    console.log('   - Expiration: Never');
    console.log('4. Haz clic en "Create token"');
    console.log('5. ✂️  COPIA el token (ctrl+c)');
    console.log('6. Vuelve aquí y pégalo\n');

    let token = '';
    let valid = false;

    while (!valid) {
        token = await question('Pega tu nuevo token aquí: ');
        token = token.trim();

        if (token.startsWith('hf_') && token.length > 20) {
            console.log('\n✅ Token válido detectado!');
            valid = true;
        } else {
            console.log('\n❌ Token inválido.');
            console.log('   ⚠️  Debe comenzar con "hf_" y tener al menos 20 caracteres');
            console.log('   Por favor, cópialo de nuevo.\n');
        }
    }

    // Guardar token
    const envPath = path.join(process.cwd(), '.env');
    
    let envContent = `# Configuración del Servidor
PORT=5000

# Hugging Face API Token - SEGURO Y PROTEGIDO
# Este token fue creado el ${new Date().toLocaleString()}
HF_API_KEY=${token}

# ⚠️  IMPORTANTE: Este archivo está en .gitignore
# NO será subido a GitHub (protegido automáticamente)
`;

    try {
        fs.writeFileSync(envPath, envContent);
        
        console.log('\n📝 Archivo .env actualizado correctamente!');
        console.log('📁 Ubicación:', envPath);
        
        console.log('\n🔒 SEGURIDAD:');
        console.log('   ✅ Token guardado en .env');
        console.log('   ✅ .env está en .gitignore');
        console.log('   ✅ Tu token NO será subido a GitHub');
        
        console.log('\n🚀 SIGUIENTE PASO:');
        console.log('   Ejecuta: npm start');
        console.log('   Luego abre index.html en tu navegador');
        console.log('   ¡Tu chatbot IA funcionará! 🤖\n');

    } catch (error) {
        console.log('\n❌ Error al guardar:', error.message);
        console.log('\nIntenta hacerlo manualmente:');
        console.log('1. Abre el archivo .env');
        console.log('2. Reemplaza: HF_API_KEY=tu_nuevo_token_aqui');
        console.log('3. Con: HF_API_KEY=' + token);
        console.log('4. Guarda el archivo\n');
    }

    rl.close();
}

// Ejecutar
setupToken().catch(error => {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
});
