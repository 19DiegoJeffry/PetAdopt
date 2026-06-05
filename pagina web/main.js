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

// Cargar perros cuando se carga la página
document.addEventListener('DOMContentLoaded', loadDogs);
