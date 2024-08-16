document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    const feedback = document.getElementById('feedback');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const file = fileInput ? fileInput.files[0] : null;
        const title = titleInput ? titleInput.value : '';
        const description = descriptionInput ? descriptionInput.value : '';
        const uploadPreset = 'Imagenes';  // Nombre del upload preset que creaste

        if (!file) {
            feedback.textContent = 'Por favor, selecciona una imagen para subir.';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dqgzxa6uk/image/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al subir la imagen');
            }

            const result = await response.json();
            console.log('Imagen subida con éxito:', result);

            // Procesar el resultado
            feedback.textContent = 'Imagen subida con éxito.';
            feedback.style.color = 'green';

            // Aquí puedes añadir el resultado a una base de datos o similar
            // const post = { imageUrl: result.secure_url, title, description };
            // Agregar a tu base de datos o mostrar en la interfaz

        } catch (error) {
            console.error('Error al subir la imagen:', error);
            feedback.textContent = 'Error al subir la imagen.';
            feedback.style.color = 'red';
        }
    });
});



