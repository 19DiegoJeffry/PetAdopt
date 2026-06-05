# 🚀 Guía de Inicio Rápido - PetAdopt

## ¿Qué tienes?
Tu página web de adopción de perros está lista con:
- ✅ **index.html** - Página web completa (HTML + CSS + JavaScript)
- ✅ **server.js** - Backend Node.js/Express
- ✅ **Chatbot inteligente** - Responde preguntas sobre adopción y cuidados
- ✅ **Galería de perros** - 6 perros disponibles para adoptar
- ✅ **Sección de cuidados** - Información detallada sobre cuidado de mascotas

---

## 📋 Opción 1: RÁPIDO (Solo Frontend - 30 segundos)

1. **Abre el archivo `index.html` directamente en tu navegador**
   - Haz doble clic en `index.html`
   - O arrastra el archivo a tu navegador

✨ **¡Listo!** El chatbot funciona sin necesidad de servidor

---

## 💻 Opción 2: CON BACKEND (Recomendado - 2 minutos)

### Paso 1: Instalar dependencias
```bash
# Abre una terminal en la carpeta del proyecto y escribe:
npm install
```

### Paso 2: Iniciar el servidor
```bash
npm start
```

Verás algo como:
```
🐾 Servidor PetAdopt ejecutándose en http://localhost:5000
📨 Endpoint de chatbot: POST http://localhost:5000/api/chat
```

### Paso 3: Abrir la página
- Abre `index.html` en tu navegador
- O abre: `http://localhost:8000` (si tienes un servidor local)

---

## 🎯 ¿Qué hacer ahora?

### Probar el Chatbot
1. Abre la página web
2. Busca el botón de chat en la esquina inferior derecha (💬)
3. Haz preguntas como:
   - "¿Cómo adopto un perro?"
   - "¿Qué cuidados necesita un perro?"
   - "¿Cuánto cuesta adoptar?"
   - "¿Cuál es el proceso de adopción?"

### Explorar la Página
- **Inicio**: Ver el banner principal
- **Adoptar**: Ver galería de perros disponibles
- **Cuidados**: Leer guía completa de cuidados
- **Sobre Nosotros**: Ver información de la plataforma

### Personalizar
- Edita `index.html` para cambiar colores, textos, perros
- Edita `server.js` para agregar más respuestas del chatbot
- Cambia el logo "🐾 PetAdopt" por tu nombre

---

## 🔧 Solución de Problemas

### El chatbot no responde
- ✅ Verifica que `server.js` esté ejecutándose (`npm start`)
- ✅ Abre las herramientas del navegador (F12) para ver errores
- ✅ El chatbot tiene modo fallback, debería funcionar sin servidor

### npm no funciona
- Instala Node.js desde https://nodejs.org/
- Verifica: `node --version` y `npm --version`

### Puerto 5000 en uso
Cambia el puerto en `server.js`:
```javascript
const PORT = process.env.PORT || 5000; // Cambiar a 5001, 3000, etc.
```

---

## 📱 Características Principales

### Desktop
```
┌─────────────────────────────────────┐
│ 🐾 PetAdopt | Inicio | Adoptar | ... │
├─────────────────────────────────────┤
│        Dale un Hogar a un Perrito   │
├─────────────────────────────────────┤
│  Galería: [Max] [Bella] [Charlie]   │
├─────────────────────────────────────┤
│  Sección de Cuidados (6 tarjetas)   │
├─────────────────────────────────────┤
│                      ┌──────────────┐│
│                      │ 💬 Asistente││
│                      │ Hola! ¿Cómo || 
│                      │ puedo ayudar?││
│                      └──────────────┘│
└─────────────────────────────────────┘
```

### Mobile
- Menú adaptado
- Chat a pantalla completa
- Galería de 1 columna
- Todo optimizado para tocar

---

## 📊 Estadísticas

- **500+** Perros adoptados
- **200+** Familias felices
- **24/7** Soporte con chatbot
- **6** Razas disponibles

---

## 🤖 Temas del Chatbot

El chatbot puede ayudarte con:
- ✅ Proceso de adopción
- ✅ Alimentación de perros
- ✅ Salud y veterinario
- ✅ Ejercicio y actividad
- ✅ Higiene y grooming
- ✅ Comportamiento y entrenamiento
- ✅ Emergencias veterinarias
- ✅ Información de contacto
- ✅ Requisitos de adopción
- ✅ Precios y costos

---

## 🎨 Personalización Rápida

### Cambiar perros disponibles
En `index.html`, encuentra `const dogsData = [...]` y edita

### Cambiar colores
En el CSS dentro de `index.html`, edita:
```css
:root {
    --primary-color: #FF6B6B;     /* Rojo coral */
    --secondary-color: #4ECDC4;   /* Turquesa */
    --dark-color: #2C3E50;        /* Azul oscuro */
    --light-color: #ECF0F1;       /* Gris claro */
}
```

### Cambiar nombre
Reemplaza "PetAdopt" en `index.html`

---

## 📞 Próximos Pasos

1. ✅ Personaliza los datos (nombre, contacto, perros)
2. ✅ Prueba todas las funciones
3. ✅ Comparte el link con amigos
4. ✅ Mejora el chatbot agregando más respuestas
5. ✅ Integra con base de datos real (MongoDB, PostgreSQL)

---

## 📚 Recursos

- **HTML/CSS/JS**: https://www.w3schools.com
- **Node.js**: https://nodejs.org/docs
- **Express**: https://expressjs.com
- **CORS**: https://enable-cors.org

---

## 🎉 ¡Listo!

Tu página web de adopción de perros está lista. ¡Que disfrutes! 🐾

¿Necesitas ayuda? Revisa el `README.md` para más detalles.
