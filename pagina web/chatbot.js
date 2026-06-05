// Sistema de Chatbot IA integrado
let chatHistory = [];

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatBody = document.getElementById('chatBody');
    chatWidget.classList.toggle('minimized');
    chatBody.classList.toggle('hidden');
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Agregar mensaje del usuario
    addMessageToChat(message, 'user-message');
    chatInput.value = '';
    
    // Enviar a servidor backend para procesar con IA
    fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        addMessageToChat(data.reply, 'bot-message');
    })
    .catch(error => {
        console.error('Error:', error);
        addMessageToChat('Disculpa, estoy teniendo problemas. Por favor intenta de nuevo.', 'bot-message');
    });
}

function addMessageToChat(message, className) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    
    // Scroll al último mensaje
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Base de datos de respuestas para el chatbot (fallback si backend no está disponible)
const chatbotResponses = {
    adopcion: "Para adoptar un perro, debes rellenar nuestro formulario de solicitud, proporcionar referencias, y realizar una entrevista. El proceso toma aproximadamente 2-3 semanas para asegurar que el perro encuentra el hogar perfecto.",
    
    cuidados: "Los cuidados básicos incluyen: alimentación de calidad, ejercicio diario, visitas al veterinario, vacunas, desparasitación, higiene y mucho amor. ¿Necesitas información específica sobre algún aspecto?",
    
    alimentacion: "Los perros adultos deben comer 1-2 veces al día. La cantidad depende de la raza y tamaño. Usa alimento de calidad premium y siempre proporciona agua fresca. Evita chocolate, uvas y cebolla.",
    
    salud: "Es importante llevar a tu perro al veterinario anualmente para chequeos, vacunas y desparasitación. La castración/esterilización se recomienda a los 6 meses de edad.",
    
    ejercicio: "Mínimo 30-60 minutos diarios de ejercicio según la raza. Esto incluye caminatas, juego e interacción. Los perros activos son perros más felices y saludables.",
    
    higiene: "Baña a tu perro cada 4-6 semanas, cepilla su pelaje 2-3 veces por semana, corta sus uñas cada 3-4 semanas y limpia sus oídos semanalmente.",
    
    comportamiento: "El entrenamiento temprano y los refuerzos positivos son clave. Establece rutinas claras, sé consistente y paciente. La socialización también es importante.",
    
    emergencia: "En caso de emergencia veterinaria, llama a tu veterinario o a una clínica de emergencias 24/7. Signos de emergencia incluyen dificultad respiratoria, hemorragia, vómito persistente o letargo.",
    
    contacto: "Puedes contactarnos en: 📧 info@petadopt.com | 📞 +1-800-PERROS | Estamos abiertos de lunes a viernes, 9am-6pm.",
    
    pagina: "PetAdopt es una plataforma dedicada a facilitar la adopción de perros rescatados y proporcionar información sobre cuidados responsables de mascotas.",
    
    perros: "Tenemos varias razas disponibles: Golden Retrievers, Labradores, Bulldogs Franceses, Cocker Spaniels, Pastores Alemanes y Beagles. ¿Te interesa alguna raza en particular?",
    
    precio: "La adopción tiene un costo de $50-150 USD que cubre vacunas, microchip y esterilización. Esto ayuda a mantener nuestras operaciones de rescate.",
    
    requisitos: "Requisitos básicos: mayor de 18 años, tener un hogar estable, poder proporcionar cuidado veterinario, referencias de carácter y disponibilidad de tiempo para el perro."
};

// Función para procesar mensajes y buscar respuestas
function processMessage(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Palabras clave para diferentes tópicos
    const keywords = {
        adopcion: ['adoptar', 'adopción', 'quiero adoptar', 'cómo adopto', 'proceso adopción'],
        cuidados: ['cuidado', 'cuidados', 'cómo cuidar', 'qué necesita'],
        alimentacion: ['comer', 'comida', 'alimentación', 'qué come', 'dieta'],
        salud: ['salud', 'veterinario', 'enfermo', 'enfermedad', 'médico', 'vacuna'],
        ejercicio: ['ejercicio', 'caminar', 'paseo', 'actividad', 'jugar'],
        higiene: ['baño', 'limpio', 'higiene', 'grooming', 'peluquería'],
        comportamiento: ['comportamiento', 'entrenamiento', 'entrenar', 'obediencia', 'trucos'],
        emergencia: ['emergencia', 'urgencia', 'ayuda', 'problema', 'accidente'],
        contacto: ['contacto', 'teléfono', 'email', 'cómo contactar', 'dirección'],
        pagina: ['quién eres', 'qué es', 'acerca de', 'sobre ustedes', 'about'],
        perros: ['qué perros', 'razas', 'qué tenéis', 'disponibles'],
        precio: ['precio', 'costo', 'cuánto cuesta', 'tarifa', 'pago'],
        requisitos: ['requisitos', 'qué necesito', 'cómo empiezo', 'condiciones']
    };
    
    // Buscar palabra clave coincidente
    for (const [topic, words] of Object.entries(keywords)) {
        if (words.some(word => lowerMessage.includes(word))) {
            return chatbotResponses[topic];
        }
    }
    
    // Respuesta por defecto
    return "¡Hola! Soy el asistente de PetAdopt. Puedo ayudarte con preguntas sobre adopción, cuidados, alimentación, salud, ejercicio, higiene, comportamiento, emergencias, contacto y más. ¿En qué puedo ayudarte?";
}

// Función fallback para cuando el servidor no está disponible
function sendMessageFallback() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    addMessageToChat(message, 'user-message');
    chatInput.value = '';
    
    const response = processMessage(message);
    setTimeout(() => {
        addMessageToChat(response, 'bot-message');
    }, 500);
}
