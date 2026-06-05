const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Contexto del sistema para el IA
const SYSTEM_CONTEXT = `Eres un asistente de inteligencia artificial amable, empático y experto para PetAdopt, 
una plataforma de adopción y cuidado responsable de mascotas.

Debes responder en español con un tono amigable. Tu objetivo principal es ayudar a los usuarios con cualquier pregunta, 
incluyendo temas más generales de animales, mascotas (como gatos, conejos, etc.), bienestar animal o convivencia familiar. 

Instrucciones de respuesta:
1. Si te preguntan sobre otros temas de mascotas (por ejemplo, cómo cuidar un gato, alimentar a un conejo o bienestar animal general), 
   responde con conocimiento y amabilidad, y luego haz una invitación amistosa indicando que en PetAdopt nos especializamos 
   principalmente en conectar perros rescatados con familias amorosas y que pueden ver nuestros perros disponibles o iniciar una adopción.
2. Si te preguntan cosas completamente fuera del mundo de las mascotas (por ejemplo, programación, matemáticas o política), responde de forma muy 
   breve y cortés indicando que como asistente de PetAdopt estás enfocado en el cuidado de los animales, y redirige la conversación hacia 
   temas de mascotas o adopción.`;

// Base de datos de respuestas predefinidas como fallback
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

// Función para usar IA (Hugging Face API - gratuita)
async function getAIResponse(userMessage) {
    try {
        const API_KEY = process.env.HF_API_KEY;
        
        if (!API_KEY) {
            console.warn('⚠️ HF_API_KEY no configurada. Usando fallback de respuestas predefinidas.');
            return null;
        }
        
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct",
            {
                inputs: `${SYSTEM_CONTEXT}\n\nUsuario: ${userMessage}\n\nAsistente:`,
                parameters: {
                    max_length: 512,
                    temperature: 0.7,
                    top_p: 0.9,
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            }
        );
        
        if (response.data && response.data[0] && response.data[0].generated_text) {
            const fullText = response.data[0].generated_text;
            const parts = fullText.split("Asistente:");
            const reply = parts.length > 1 ? parts[1] : fullText;
            return reply.trim();
        }
    } catch (error) {
        console.error("Error con IA externa:", error.message);
    }
    
    return null;
}

// Función para procesar mensajes con fallback a respuestas predefinidas
function processMessageFallback(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
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
    
    for (const [topic, words] of Object.entries(keywords)) {
        if (words.some(word => lowerMessage.includes(word))) {
            return chatbotResponses[topic];
        }
    }
    
    return "¡Hola! Soy el asistente de PetAdopt. Puedo ayudarte con preguntas sobre adopción, cuidados, alimentación, salud, ejercicio, higiene, comportamiento, emergencias, contacto y más. ¿En qué puedo ayudarte?";
}

// Rutas
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API de PetAdopt Chatbot con IA' });
});

// Endpoint del chatbot con IA
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Mensaje vacío' });
    }
    
    try {
        // Intentar obtener respuesta de IA
        console.log(`📨 Mensaje recibido: "${message}"`);
        let reply = await getAIResponse(message);
        
        // Si no hay respuesta de IA, usar fallback
        if (!reply) {
            console.log('⚠️ IA no disponible, usando fallback de respuestas predefinidas');
            reply = processMessageFallback(message);
        } else {
            console.log('✅ Respuesta generada por IA');
        }
        
        res.json({ reply });
    } catch (error) {
        console.error('Error en /api/chat:', error.message);
        const fallbackReply = processMessageFallback(message);
        res.json({ reply: fallbackReply });
    }
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🐾 Servidor PetAdopt ejecutándose en http://localhost:${PORT}`);
    console.log(`📨 Endpoint de chatbot: POST http://localhost:${PORT}/api/chat`);
    console.log(`🤖 Chatbot IA habilitado con respuestas predefinidas como fallback`);
});
