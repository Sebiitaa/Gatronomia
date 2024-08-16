document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    const notification = document.getElementById('notification');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const file = fileInput.files[0];
        const title = titleInput.value;
        const description = descriptionInput.value;
        const uploadPreset = 'Imagenes';  // Nombre del upload preset que creaste en Cloudinary

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

            const postData = {
                imageUrl: result.secure_url,
                title: title,
                description: description
            };

            // Guardar los datos del post en localStorage
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push(postData);
            localStorage.setItem('posts', JSON.stringify(posts));

            // Notificación de éxito
            notification.textContent = '¡Hito histórico publicado con éxito!';
            notification.style.color = 'green';

            // Limpiar el formulario
            form.reset();

        } catch (error) {
            console.error('Error al subir la imagen:', error);
            notification.textContent = 'Error al publicar el hito histórico.';
            notification.style.color = 'red';
        }
    });
});

