document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const alert = document.getElementById('alert');
    const uploadPreset = 'Imagenes';  // Nombre del upload preset que creaste

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const file = fileInput.files[0];
        const title = titleInput.value;
        const description = descriptionInput.value;

        if (!file) {
            alert.textContent = 'Por favor, selecciona un archivo.';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dqgzxa6uk/image/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al subir la imagen');
            }

            const result = await response.json();
            const imageUrl = result.secure_url;

            // Guardar en localStorage o en una base de datos (ejemplo con localStorage)
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push({ title, description, imageUrl });
            localStorage.setItem('posts', JSON.stringify(posts));

            alert.textContent = 'Imagen subida con éxito';
            titleInput.value = '';
            descriptionInput.value = '';
            fileInput.value = '';

            // Opcionalmente, redirigir al feed
            // window.location.href = 'feed.html';

        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert.textContent = 'Error al subir la imagen';
        }
    });
});
