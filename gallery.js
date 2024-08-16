document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const file = fileInput.files[0];
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

            // Aquí puedes guardar la URL de la imagen en tu feed
            // Por ejemplo, podrías almacenar el resultado en localStorage o en una base de datos.
            saveToFeed(result.secure_url);

        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    });
});

function saveToFeed(imageUrl) {
    // Guardar la imagen en el feed (esto es un ejemplo básico)
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push({ imageUrl: imageUrl });
    localStorage.setItem('posts', JSON.stringify(posts));
}