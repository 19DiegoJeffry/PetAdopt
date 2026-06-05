// Sistema de Chatbot IA integrado para PetAdopt
let chatHistory = [];

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatBody = document.getElementById('chatBody');
    if (chatWidget && chatBody) {
        chatWidget.classList.toggle('minimized');
        chatBody.classList.toggle('hidden');
    }
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) return;
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Agregar mensaje del usuario
    addMessageToChat(message, 'user-message');
    chatInput.value = '';
    
    // Intentar conectar con el servidor backend, si falla usa fallback local
    fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Respuesta de red no ok');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.reply) {
            addMessageToChat(data.reply, 'bot-message');
        } else {
            throw new Error('Respuesta inválida del servidor');
        }
    })
    .catch(error => {
        console.warn('Backend offline o error en API. Usando respuestas locales de fallback:', error);
        // Si no hay servidor o hay error, usa respuestas locales
        const response = processMessage(message);
        setTimeout(() => {
            addMessageToChat(response, 'bot-message');
        }, 500);
    });
}

function addMessageToChat(message, className) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    
    // Scroll al último mensaje
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Base de datos de respuestas enriquecida para el chatbot (fallback si backend no está disponible)
const chatbotResponses = {
    adopcion: "Para adoptar un perro en PetAdopt, debes: 1) Rellenar nuestro formulario de solicitud, 2) Proporcionar referencias personales y de carácter, 3) Realizar una entrevista con nuestro equipo, 4) Pasar las verificaciones de hogar. El proceso toma aproximadamente 2-3 semanas. El costo es de $50-150 USD que cubre vacunas, microchip y esterilización.",
    
    cuidados: "Los cuidados básicos de un perro incluyen: alimentación de calidad (1-2 veces al día), ejercicio diario (30-60 minutos), visitas al veterinario (mínimo anual), vacunas completas, desparasitación trimestral, higiene regular (baños cada 4-6 semanas), cepillado del pelaje, corte de uñas, y sobre todo, mucho amor y socialización. ¿Necesitas información específica sobre algún aspecto?",
    
    alimentacion: "La alimentación es crucial para la salud de tu perro. Adultos: 1-2 veces al día según la raza. Cachorros: 3-4 veces al día. Usa alimento premium balanceado nutricionalmente. Cantidad: depende del tamaño y metabolismo. IMPORTANTE: Siempre agua fresca disponible. EVITA: chocolate, uvas, pasas, cebolla, aguacate, alimentos tóxicos. Consulta con tu veterinario.",
    
    salud: "La salud veterinaria es fundamental. Chequeos anuales obligatorios. Vacunas: rabia, moquillo, parvovirosis. Desparasitación: cada 3 meses. Esterilización/castración: a los 6 meses. Limpieza dental: anual. Signos de alerta: cambios de comportamiento, falta de apetito, vómito, diarrea.",
    
    ejercicio: "El ejercicio es vital: Mínimo 30-60 minutos diarios según la raza. Caminatas, juego activo, carrera. Razas grandes necesitan más. Ejercicio mental: juguetes inteligentes, entrenamiento. Un perro cansado es un perro feliz.",
    
    higiene: "Higiene regular: Baños cada 4-6 semanas. Cepillado 2-3 veces por semana. Corte de uñas cada 3-4 semanas. Limpieza de oídos semanal. Cuidado dental diario o snacks dentales.",
    
    comportamiento: "Entrenamiento esencial: Usa refuerzos positivos. Establece rutinas claras. Socialización temprana. Paciencia: los cambios toman tiempo. Considera un entrenador profesional si lo necesitas.",
    
    emergencia: "Emergencias críticas: Dificultad respiratoria, hemorragia, vómito persistente, letargo, convulsiones, accidentes. ACCIÓN: Llama veterinario 24/7 INMEDIATAMENTE. Los minutos son críticos.",
    
    contacto: "¡Contacta con PetAdopt! 📧 info@petadopt.com | 📞 +1-800-PERROS | 🕒 Lunes a viernes, 9am-6pm. O usa este chat. ¡Responderemos pronto!",
    
    pagina: "PetAdopt conecta perros rescatados con familias amorosas. Hemos ayudado a 500+ perros a encontrar hogar con 200+ familias felices. Nuestra misión: facilitar adopción responsable e información completa sobre cuidados.",
    
    perros: "6 adorables perros esperan su familia: 🐕 Max (Golden Retriever, 2 años) 🐶 Bella (Labrador, 3 años) 🐕 Charlie (Bulldog, 1 año) 🐶 Lucy (Cocker Spaniel, 4 años) 🐕 Rocky (Pastor Alemán, 3 años) 🐶 Daisy (Beagle, 2 años)",
    
    precio: "Adopción: $50-150 USD. Incluye: ✓ Vacunas ✓ Microchip ✓ Esterilización ✓ Chequeo veterinario ✓ Documentos. Ayuda a mantener operaciones de rescate.",
    
    requisitos: "Para adoptar necesitas: ✓ Ser mayor de 18 ✓ Hogar estable ✓ Cuidado veterinario ✓ Tiempo disponible ✓ Referencias. Aseguramos que cada perro va a un hogar amoroso.",
    
    navegacion: "Menú superior PetAdopt: 📍 INICIO - Página principal 📍 ADOPTAR - Nuestros 6 perros 📍 CUIDADOS - Guía completa 📍 SOBRE NOSOTROS - Información",
    
    cuidados_seccion: "Sección CUIDADOS: 🍖 ALIMENTACIÓN 🏥 SALUD 🏃 EJERCICIO 🧼 HIGIENE 🏠 AMBIENTE ❤️ AMOR - 6 guías completas",
    
    galeria: "Galería ADOPCIÓN: 6 perros con nombre, edad, raza, descripción, botón 'Quiero Adoptar'. ¡Cada uno tiene historia única!",
    
    rex: "¡Soy Rex! Tu asistente 24/7 de PetAdopt. Estoy aquí para ayudarte con: adopción, cuidados, preguntas sobre la página, nuestros perros, y más. ¡Pregúntame lo que necesites!",
    
    bienvenida: "¡Bienvenido a PetAdopt! Soy Rex. Puedo ayudarte con: 1) Conocer nuestros 6 perros 2) Aprender cuidados 3) Info adopción 4) Cualquier pregunta. ¿En qué puedo ayudarte?",
    
    proceso_adopcion: "Proceso PetAdopt: 1) Solicitud online 2) Revisión perfil 3) Entrevista 4) Verificación hogar 5) Aprobación 6) ¡Recoger perro! Toma 2-3 semanas.",
    
    seguimiento: "Post-adopción: Documentación legal, historial médico, consejos adaptación, acceso chat (conmigo, Rex), contactos veterinarios, comunidad online. ¡De por vida!",
    
    adaptacion: "Adaptar perro nuevo: Primeras semanas: espacio seguro, rutina, refuerzos positivos. Salidas cortas después. Socialización gradual. Entrenamiento paciente. Mucho amor diario. Cada perro es único.",
    mascotas_general: "En PetAdopt nos enfocamos principalmente en la adopción y el cuidado de perros rescatados. Sin embargo, creemos que todas las mascotas (gatos, conejos, aves, etc.) merecen un hogar seguro y lleno de amor. Te invitamos a conocer a nuestros perros disponibles o consultar sobre el proceso de adopción.",
    fuera_tema: "Como asistente de PetAdopt, estoy enfocado en el bienestar de los animales, la adopción de mascotas y sus cuidados. ¿Te gustaría saber sobre los perros disponibles en nuestro refugio o los requisitos de adopción?"
};

// Función para procesar mensajes y buscar respuestas locales (fallback)
function processMessage(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    const keywords = {
        mascotas_general: ['gato', 'gatos', 'conejo', 'conejos', 'pájaro', 'ave', 'hámster', 'mascota', 'mascotas', 'animales', 'animal'],
        fuera_tema: ['clima', 'fútbol', 'política', 'historia', 'ciencia', 'matemática', 'música', 'televisión', 'película', 'juego', 'computadora', 'programación'],
        adopcion: ['adoptar', 'adopción', 'quiero adoptar', 'cómo adopto', 'proceso adopción', 'pasos'],
        cuidados: ['cuidado', 'cuidados', 'cómo cuidar', 'qué necesita', 'necesidades'],
        alimentacion: ['comer', 'comida', 'alimentación', 'qué come', 'dieta', 'alimento', 'nutrición'],
        salud: ['salud', 'veterinario', 'enfermo', 'enfermedad', 'médico', 'vacuna', 'chequeo', 'esterilización'],
        ejercicio: ['ejercicio', 'caminar', 'paseo', 'actividad', 'jugar', 'correr', 'actividad física'],
        higiene: ['baño', 'limpio', 'higiene', 'grooming', 'peluquería', 'aseo', 'cepillo', 'uñas', 'dientes'],
        comportamiento: ['comportamiento', 'entrenamiento', 'entrenar', 'obediencia', 'trucos', 'disciplina', 'adiestramiento'],
        emergencia: ['emergencia', 'urgencia', 'ayuda', 'problema', 'accidente', 'envenenamiento', 'crítico'],
        contacto: ['contacto', 'teléfono', 'email', 'cómo contactar', 'dirección', 'ayuda', 'comunicarse', 'llamar'],
        pagina: ['quién eres', 'qué es', 'acerca de', 'sobre ustedes', 'about', 'misión', 'objetivo', 'petadopt'],
        perros: ['qué perros', 'razas', 'qué tenéis', 'disponibles', 'perros', 'max', 'bella', 'charlie', 'lucy', 'rocky', 'daisy', 'adoptar'],
        precio: ['precio', 'costo', 'cuánto cuesta', 'tarifa', 'pago', 'cuesta', 'vale', 'dinero'],
        requisitos: ['requisitos', 'qué necesito', 'cómo empiezo', 'condiciones', 'necesario', 'edad'],
        navegacion: ['cómo navego', 'menú', 'dónde', 'cómo busco', 'home', 'inicio', 'sección', 'página'],
        cuidados_seccion: ['sección cuidados', 'cuidados página', 'información cuidados', 'guía'],
        galeria: ['galería', 'fotos', 'imágenes', 'donde estan los perros', 'ver perros'],
        rex: ['quién eres', 'tu nombre', 'rex', 'asistente', 'quién soy'],
        bienvenida: ['hola', 'hi', 'ayuda', 'ayúdame', 'necesito ayuda', 'qué puedes hacer', 'cómo funcionas'],
        proceso_adopcion: ['paso', 'pasos', 'cómo es el proceso', 'detalle', 'fase'],
        seguimiento: ['después adopción', 'post adopción', 'seguimiento', 'después de adoptar'],
        adaptacion: ['adaptar perro', 'acostumbrar', 'nuevo hogar', 'adaptación', 'primeros días', 'cómo adaptarse'],
    };
    
    for (const [topic, words] of Object.entries(keywords)) {
        if (words.some(word => lowerMessage.includes(word))) {
            return chatbotResponses[topic];
        }
    }
    
    return "¡Hola! Soy Rex, tu asistente en PetAdopt. Puedo ayudarte con: adopción, cuidados, alimentación, salud, ejercicio, higiene, comportamiento, emergencias, navegación, preguntas sobre nuestros perros, precios, requisitos, y mucho más. ¿Qué necesitas saber?";
}
