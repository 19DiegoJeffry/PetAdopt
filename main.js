// Base de datos de perros disponibles para adoptar
const dogsData = [
    {
        name: "Max",
        age: 2,
        breed: "Golden Retriever",
        description: "Amigable, energético y perfecto para familias.",
        emoji: "🐕"
    },
    {
        name: "Bella",
        age: 3,
        breed: "Labrador",
        description: "Dulce y leal, adora jugar y paseos largos.",
        emoji: "🐶"
    },
    {
        name: "Charlie",
        age: 1,
        breed: "Bulldog Francés",
        description: "Pequeño pero valiente, perfecto para apartamentos.",
        emoji: "🐕"
    },
    {
        name: "Lucy",
        age: 4,
        breed: "Cocker Spaniel",
        description: "Inteligente y cariñosa, muy obediente.",
        emoji: "🐶"
    },
    {
        name: "Rocky",
        age: 3,
        breed: "Pastor Alemán",
        description: "Protector y leal, requiere ejercicio regular.",
        emoji: "🐕"
    },
    {
        name: "Daisy",
        age: 2,
        breed: "Beagle",
        description: "Aventurera y curiosa, ideal para familias activas.",
        emoji: "🐶"
    }
];

// Función para cargar los perros en la galería
function loadDogs() {
    const dogsGallery = document.getElementById('dogsGallery');
    if (!dogsGallery) return;
    dogsGallery.innerHTML = '';
    
    dogsData.forEach(dog => {
        const dogCard = document.createElement('div');
        dogCard.className = 'dog-card';
        dogCard.innerHTML = `
            <div class="dog-image">${dog.emoji}</div>
            <div class="dog-info">
                <div class="dog-name">${dog.name}</div>
                <div class="dog-details">
                    <p><strong>Edad:</strong> ${dog.age} años</p>
                    <p><strong>Raza:</strong> ${dog.breed}</p>
                    <p>${dog.description}</p>
                </div>
                <button class="btn btn-adopt" onclick="alert('¡Gracias por tu interés en adoptar a ${dog.name}! Pronto te contactaremos.')">
                    Quiero Adoptar
                </button>
            </div>
        `;
        dogsGallery.appendChild(dogCard);
    });
}

// Inicializar manejadores de formularios
function initializeFormHandlers() {
    // Formulario de Adopción
    const adoptionForm = document.getElementById('adoptionForm');
    if (adoptionForm) {
        adoptionForm.addEventListener('submit', handleAdoptionSubmit);
    }
    
    // Formulario de Donación
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', handleDonationSubmit);
        
        const donationBtns = document.querySelectorAll('.donation-btn');
        donationBtns.forEach(btn => {
            btn.addEventListener('click', selectDonationAmount);
        });
    }
    
    // Formulario de Reporte
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', handleReportSubmit);
    }
    
    // Formulario de Voluntariado
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', handleVolunteerSubmit);
    }
}

// Manejo de Formulario de Adopción
function handleAdoptionSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('adopterName').value;
    const email = document.getElementById('adopterEmail').value;
    const phone = document.getElementById('adopterPhone').value;
    const dog = document.getElementById('adoptDog').value;
    const reason = document.getElementById('adoptReason').value;
    const experience = document.getElementById('adoptExperience').value;
    const houseType = document.getElementById('adoptHouseType').value;
    const yard = document.getElementById('adoptYard').value;
    
    // Validaciones
    if (!name || !email || !phone || !dog || !reason || !experience || !houseType || !yard) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    // Crear objeto con los datos
    const adoptionData = {
        name, email, phone, dog, reason, experience, houseType, yard,
        timestamp: new Date().toLocaleString('es-ES')
    };
    
    // Guardar en localStorage
    let submissions = JSON.parse(localStorage.getItem('adoptionSubmissions') || '[]');
    submissions.push(adoptionData);
    localStorage.setItem('adoptionSubmissions', JSON.stringify(submissions));
    
    // Mostrar mensaje de éxito
    alert(`¡Gracias ${name}! Tu solicitud de adopción para ${dog} ha sido recibida.\nNos pondremos en contacto contigo pronto al correo: ${email}`);
    
    // Limpiar formulario
    document.getElementById('adoptionForm').reset();
}

// Manejo de Formulario de Donación
function selectDonationAmount(e) {
    e.preventDefault();
    
    const amount = e.target.getAttribute('data-amount');
    document.getElementById('customAmount').value = amount;
    
    // Actualizar botones activos
    document.querySelectorAll('.donation-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
}

function handleDonationSubmit(e) {
    e.preventDefault();
    
    const customAmount = document.getElementById('customAmount').value;
    const email = document.getElementById('donorEmail').value;
    const recurring = document.getElementById('recurringDonation').checked;
    
    if (!customAmount || parseFloat(customAmount) <= 0) {
        alert('Por favor selecciona o ingresa una cantidad válida');
        return;
    }
    
    // Crear objeto con datos de donación
    const donationData = {
        amount: parseFloat(customAmount),
        email: email || 'anónimo',
        recurring: recurring,
        timestamp: new Date().toLocaleString('es-ES')
    };
    
    // Guardar en localStorage
    let donations = JSON.parse(localStorage.getItem('donations') || '[]');
    donations.push(donationData);
    localStorage.setItem('donations', JSON.stringify(donations));
    
    const recurringText = recurring ? ' (mensual)' : '';
    alert(`¡Gracias por tu donación de $${customAmount}${recurringText}! Tu aporte ayudará a cuidar a nuestros perritos. 🐾`);
    
    // Limpiar formulario
    document.getElementById('donationForm').reset();
    document.querySelectorAll('.donation-btn').forEach(btn => {
        btn.classList.remove('active');
    });
}

// Manejo de Formulario de Reporte
function previewPhoto(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('photoPreview');
    
    if (file && preview) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 100%; height: auto; display: block;">`;
        };
        reader.readAsDataURL(file);
    }
}

function handleReportSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('reporterName').value;
    const email = document.getElementById('reporterEmail').value;
    const phone = document.getElementById('reporterPhone').value;
    const location = document.getElementById('reportLocation').value;
    const breed = document.getElementById('reportBreed').value;
    const size = document.getElementById('reportSize').value;
    const urgency = document.getElementById('reportUrgency').value;
    const description = document.getElementById('reportDescription').value;
    const photoInput = document.getElementById('reportPhoto');
    
    // Validaciones
    if (!name || !email || !phone || !location || !breed || !size || !urgency || !description) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    // Crear objeto con datos del reporte
    const reportData = {
        name, email, phone, location, breed, size, urgency, description,
        hasPhoto: photoInput.files.length > 0,
        timestamp: new Date().toLocaleString('es-ES')
    };
    
    // Guardar en localStorage
    let reports = JSON.parse(localStorage.getItem('reports') || '[]');
    reports.push(reportData);
    localStorage.setItem('reports', JSON.stringify(reports));
    
    const urgencyText = urgency === 'critical' ? '🚨 CRÍTICA' : urgency === 'high' ? '⚠️ ALTA' : '📋 MEDIA';
    alert(`¡Reporte recibido exitosamente! 🐕\n\nUbicación: ${location}\nUrgencia: ${urgencyText}\n\nNos pondremos en contacto contigo al: ${phone} para coordinar el rescate.`);
    
    // Limpiar formulario
    document.getElementById('reportForm').reset();
    const preview = document.getElementById('photoPreview');
    if (preview) preview.innerHTML = '';
}

// Manejo de Formulario de Voluntariado/Socio
function handleVolunteerSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('volunteerName').value;
    const email = document.getElementById('volunteerEmail').value;
    const phone = document.getElementById('volunteerPhone').value;
    const age = document.getElementById('volunteerAge').value;
    const role = document.getElementById('volunteerRole').value;
    const motivation = document.getElementById('volunteerMotivation').value;
    
    // Validaciones
    if (!name || !email || !phone || !age || !role || !motivation) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    // Crear objeto con datos
    const volunteerData = {
        name, email, phone, age, role, motivation,
        timestamp: new Date().toLocaleString('es-ES')
    };
    
    // Guardar en localStorage
    let submissions = JSON.parse(localStorage.getItem('volunteerSubmissions') || '[]');
    submissions.push(volunteerData);
    localStorage.setItem('volunteerSubmissions', JSON.stringify(submissions));
    
    const roleText = role === 'socio' ? 'Socio' : role === 'voluntario' ? 'Voluntario' : 'Socio y Voluntario';
    alert(`¡Gracias ${name}! Tu solicitud para unirte como ${roleText} ha sido recibida con éxito.\nNos pondremos en contacto contigo pronto.`);
    
    // Limpiar formulario
    document.getElementById('volunteerForm').reset();
}

// Cargar perros y configurar formularios cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    loadDogs();
    initializeFormHandlers();
});
