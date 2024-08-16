document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const titleInput = document.getElementById('title-input'); // Asegúrate de que este ID exista en el HTML
    const descriptionInput = document.getElementById('description-input'); // Asegúrate de que este ID exista en el HTML

    if (!form || !fileInput || !titleInput || !descriptionInput) {
        console.error('Formulario o campos de entrada no encontrados.');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const file = fileInput.files[0];
        const title = titleInput.value;
        const description = descriptionInput.value;
        const uploadPreset = 'Imagenes';  // Nombre del upload preset que creaste

        if (!file) {
            console.error('No se seleccionó ningún archivo.');
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

            // Guardar información en el feed
            const post = {
                title: title,
                description: description,
                imageUrl: result.secure_url
            };
            savePost(post);
            
            // Mensaje de éxito
            alert('Imagen subida y guardada exitosamente.');

        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    });

    function savePost(post) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }
});




