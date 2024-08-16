document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    const notification = document.getElementById('notification');

    if (!form || !fileInput || !titleInput || !descriptionInput || !notification) {
        console.error('Elementos del formulario no encontrados.');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const file = fileInput.files[0];
        const title = titleInput.value;
        const description = descriptionInput.value;
        const uploadPreset = 'Imagenes';  // Nombre del upload preset que creaste

        if (!file) {
            notification.textContent = 'Por favor, selecciona un archivo.';
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
            console.log('Imagen subida con éxito:', result);
            notification.textContent = 'Imagen subida con éxito';
            
            // Aquí puedes añadir el resultado al feed, por ejemplo:
            // displayImage(result.secure_url, title, description);

        } catch (error) {
            console.error('Error al subir la imagen:', error);
            notification.textContent = 'Error al subir la imagen';
        }
    });
});





