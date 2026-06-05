# 🐾 PetAdopt - Página de Adopción de Perros

Una página web moderna dedicada a facilitar la adopción de perros rescatados con un chatbot inteligente que proporciona información sobre cuidados responsables de mascotas.

## ✨ Características

### Frontend
- ✅ **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- ✅ **Galería de Perros**: Grid dinámico con perros disponibles para adoptar
- ✅ **Sección de Cuidados**: Información completa sobre:
  - 🍖 Alimentación
  - 🏥 Salud y Veterinario
  - 🏃 Ejercicio y Actividad Física
  - 🧼 Higiene y Grooming
  - 🏠 Ambiente y Seguridad
  - ❤️ Amor y Socialización

### Chatbot Inteligente
- 💬 Widget flotante en la esquina inferior derecha
- 🤖 Respuestas contextuales sobre:
  - Proceso de adopción
  - Cuidados de mascotas
  - Alimentación
  - Salud veterinaria
  - Ejercicio y actividad
  - Higiene
  - Comportamiento
  - Emergencias
  - Y más...
- 🔌 Modo fallback (funciona sin servidor backend)

### Información General
- 📊 Estadísticas de adopciones
- 📧 Contacto directo
- 🎨 Diseño atractivo con gradientes y animaciones

## 🚀 Instalación y Uso

### Opción 1: Solo Frontend (Sin Backend)
1. Abre `index.html` en tu navegador
2. La página funciona completamente con chatbot basado en respuestas predefinidas

```bash
# Si tienes un servidor local:
# En Windows:
python -m http.server 8000
# O con Node.js:
npx http-server
```

### Opción 2: Con Backend Node.js (Recomendado)

#### Requisitos
- Node.js 14+ instalado
- npm o yarn

#### Pasos de Instalación

1. **Instala las dependencias del backend:**
```bash
npm install
```

2. **Inicia el servidor backend:**
```bash
npm start
# o para modo desarrollo:
npm run dev
```

3. **Abre `index.html` en tu navegador:**
```bash
# En Windows:
start index.html
# O usa un servidor local:
npx http-server
```

El servidor estará disponible en: `http://localhost:5000`

## 📁 Estructura del Proyecto

```
pagina-adopcion-perros/
├── index.html          # Página principal (HTML + CSS + JS integrados)
├── server.js           # Servidor Express para el chatbot
├── package.json        # Dependencias del proyecto
├── chatbot.js          # Scripts del chatbot (archivo de referencia)
├── main.js             # Scripts principales (archivo de referencia)
└── README.md           # Este archivo
```

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto (opcional):

```env
PORT=5000
NODE_ENV=development
```

### Cambiar Puerto del Servidor
Edita `server.js`:
```javascript
const PORT = process.env.PORT || 5000; // Cambiar 5000 por tu puerto
```

## 📱 Características Responsivas

- **Desktop (1200px+)**: Grid de 4 columnas para perros, chat ancho
- **Tablet (768px-1199px)**: Grid de 2-3 columnas, chat optimizado
- **Mobile (<768px)**: Grid de 1 columna, chat a pantalla completa

## 🤖 Cómo Funciona el Chatbot

### Flujo del Chatbot:
1. Usuario escribe un mensaje
2. Si el servidor backend está disponible → Envía a `/api/chat`
3. Si no hay servidor → Usa procesamiento local
4. Chatbot analiza palabras clave en el mensaje
5. Retorna respuesta relevante de su base de datos

### Palabras Clave Soportadas:
- Adopción: "adoptar", "adopción", "quiero adoptar"
- Cuidados: "cuidado", "cuidados", "cómo cuidar"
- Alimentación: "comer", "comida", "alimentación"
- Salud: "salud", "veterinario", "vacuna"
- Y muchas más...

## 🎯 Perros Disponibles

1. **Max** - Golden Retriever (2 años)
2. **Bella** - Labrador (3 años)
3. **Charlie** - Bulldog Francés (1 año)
4. **Lucy** - Cocker Spaniel (4 años)
5. **Rocky** - Pastor Alemán (3 años)
6. **Daisy** - Beagle (2 años)

## 📧 Información de Contacto

- **Email**: info@petadopt.com
- **Teléfono**: +1-800-PERROS
- **Horario**: Lunes a viernes, 9am-6pm

## 🎨 Paleta de Colores

- **Primario**: #FF6B6B (Rojo coral)
- **Secundario**: #4ECDC4 (Turquesa)
- **Oscuro**: #2C3E50 (Azul oscuro)
- **Claro**: #ECF0F1 (Gris claro)

## 🔐 Seguridad

- CORS habilitado en servidor backend
- Validación de entrada en mensajes del chatbot
- Sin almacenamiento de datos sensibles

## 🚀 Futuras Mejoras

- [ ] Integración con OpenAI API para IA real
- [ ] Base de datos para perros (MongoDB/PostgreSQL)
- [ ] Sistema de usuarios y perfiles
- [ ] Formulario de solicitud de adopción
- [ ] Panel administrativo
- [ ] Notificaciones por email
- [ ] Reservas de perros
- [ ] Galería de fotos por perro

## 📝 Licencia

MIT - Libre para uso comercial y personal

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**Hecho con ❤️ para los amantes de los perros 🐾**
