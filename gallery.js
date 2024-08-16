document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const notification = document.getElementById('notification');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const file = document.getElementById('file-input').files[0];
        const uploadPreset = 'Imagenes'; // Cambia esto al nombre del upload preset que creaste

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('title', title);
        formData.append('description', description);

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

            // Muestra notificación de éxito
            notification.textContent = 'Hito subido con éxito';
            notification.style.color = 'green';

            // Aquí puedes redirigir al feed si lo deseas
            // window.location.href = 'feed.html';

        } catch (error) {
            console.error('Error al subir la imagen:', error);
            notification.textContent = 'Error al subir el hito';
            notification.style.color = 'red';
        }
    });
});


