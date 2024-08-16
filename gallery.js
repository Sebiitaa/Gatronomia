document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const file = fileInput.files[0];
        const title = titleInput.value;
        const description = descriptionInput.value;
        const uploadPreset = 'Imagenes';  // Nombre del upload preset

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

            // Guardar los datos del post en localStorage (para prueba)
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push(postData);
            localStorage.setItem('posts', JSON.stringify(posts));

            // Redirigir al feed después de publicar
            window.location.href = 'feed.html';

        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    });
});
