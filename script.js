// script.js

document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const titleInput = document.getElementById('title');
    const fileInput = document.getElementById('image');
    const descriptionInput = document.getElementById('description');

    const title = titleInput.value;
    const file = fileInput.files[0];
    const description = descriptionInput.value;

    if (file && title && description) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;

            // Crear el contenedor del ítem
            const gallery = document.getElementById('gallery');
            const item = document.createElement('div');
            item.classList.add('item');

            // Crear y añadir el título
            const titleDiv = document.createElement('div');
            titleDiv.classList.add('title');
            titleDiv.textContent = title;

            // Crear y añadir la imagen
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = title;

            // Crear y añadir la descripción
            const desc = document.createElement('div');
            desc.classList.add('description');
            desc.textContent = description;

            // Añadir el título, la descripción y la imagen al contenedor del ítem
            item.appendChild(titleDiv);
            item.appendChild(img);
            item.appendChild(desc);

            // Añadir el ítem a la galería
            gallery.appendChild(item);

            // Limpiar los campos del formulario
            titleInput.value = '';
            fileInput.value = '';
            descriptionInput.value = '';
        };

        // Leer el archivo como URL de datos
        reader.readAsDataURL(file);
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Función para redirigir a la página de hitos históricos
function redirectToGallery() {
    window.location.href = 'gallery.html'; // Cambia 'gallery.html' a la ruta de tu página de galería
}


