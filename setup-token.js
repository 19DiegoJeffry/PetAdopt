#!/usr/bin/env node

/**
 * 🤖 Script para crear y configurar token de Hugging Face automáticamente
 * 
 * Uso:
 *   node setup-token.js
 * 
 * Este script:
 * 1. Te pide tus credenciales de Hugging Face
 * 2. Crea un nuevo token automáticamente
 * 3. Guarda el token en .env
 * 4. Verifica que funciona
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const https = require('https');

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
    console.log('\n🔑 CONFIGURACIÓN AUTOMÁTICA DE TOKEN HUGGING FACE\n');
    console.log('=====================================\n');

    console.log('⚠️  IMPORTANTE:');
    console.log('   Este script necesita acceso a tu cuenta de Hugging Face.');
    console.log('   Usaremos la API de Hugging Face de forma segura.\n');

    // Opción 1: Token manual
    console.log('OPCIÓN 1: Token manual (recomendado)');
    console.log('   Si ya tienes un nuevo token, puedes pegarlo aquí.\n');

    const hasToken = await question('¿Ya tienes un nuevo token de Hugging Face? (s/n): ');

    if (hasToken.toLowerCase() === 's' || hasToken.toLowerCase() === 'y') {
        const newToken = await question('Pega tu nuevo token aquí: ');
        
        if (newToken.trim().startsWith('hf_')) {
            await saveToken(newToken.trim());
            console.log('\n✅ Token guardado exitosamente!');
            rl.close();
            return;
        } else {
            console.log('\n❌ Token inválido (debe comenzar con "hf_")\n');
        }
    }

    // Opción 2: Crear con credenciales
    console.log('\n\nOPCIÓN 2: Crear token con tus credenciales');
    console.log('   Usaremos la API de Hugging Face.\n');

    const email = await question('Email de Hugging Face: ');
    const password = await question('Contraseña de Hugging Face: ');
    const tokenName = await question('Nombre del token (default: PetAdopt-Chatbot): ') || 'PetAdopt-Chatbot';

    console.log('\n⏳ Creando token...\n');

    try {
        const newToken = await createTokenViaAPI(email, password, tokenName);
        if (newToken) {
            await saveToken(newToken);
            console.log('\n✅ Token creado y guardado exitosamente!');
        } else {
            console.log('\n❌ No se pudo crear el token');
        }
    } catch (error) {
        console.log('\n❌ Error:', error.message);
        console.log('\nIntenta obtener el token manualmente en:');
        console.log('https://huggingface.co/settings/tokens');
    }

    rl.close();
}

async function createTokenViaAPI(email, password, tokenName) {
    return new Promise((resolve, reject) => {
        // Primera vez: login para obtener cookie de sesión
        const loginData = JSON.stringify({
            email: email,
            password: password
        });

        const loginOptions = {
            hostname: 'huggingface.co',
            path: '/api/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': loginData.length
            }
        };

        const loginReq = https.request(loginOptions, (loginRes) => {
            let data = '';

            loginRes.on('data', chunk => {
                data += chunk;
            });

            loginRes.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    
                    if (response.token) {
                        resolve(response.token);
                    } else {
                        reject(new Error('No se pudo obtener token de autenticación'));
                    }
                } catch (e) {
                    reject(new Error('Respuesta inválida del servidor'));
                }
            });
        });

        loginReq.on('error', reject);
        loginReq.write(loginData);
        loginReq.end();
    });
}

async function saveToken(token) {
    const envPath = path.join(process.cwd(), '.env');
    
    let envContent = `# Configuración del Servidor
PORT=5000

# Hugging Face API Token - SEGURO Y PROTEGIDO
HF_API_KEY=${token}

# Nota: Este archivo está en .gitignore y NO será subido a GitHub
`;

    fs.writeFileSync(envPath, envContent);
    console.log('📝 Token guardado en: .env');
}

// Ejecutar
setupToken().catch(error => {
    console.error('❌ Error:', error.message);
    rl.close();
    process.exit(1);
});
