// Reemplaza 'tu_cloud_name' por tu Cloud Name real y 'Imagenes' por el nombre del upload preset
const cloudName = 'dqgzxa6uk';
const uploadPreset = 'Imagenes';

document.getElementById('post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    if (!title || !description || !image) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            const imageUrl = data.secure_url;

            // Aquí puedes hacer lo que quieras con la URL, como guardarla en una base de datos
            console.log('Imagen subida exitosamente:', imageUrl);

            // Simular guardado en un arreglo (puedes hacerlo en un backend o base de datos)
            const post = {
                title: title,
                description: description,
                imageUrl: imageUrl,
            };

            // Guardar la URL de la imagen en tu estructura de datos (esto es un ejemplo)
            localStorage.setItem('posts', JSON.stringify(post));
            
            alert('Hito Histórico publicado exitosamente.');
            window.location.href = 'feed.html';
        } else {
            console.error('Error al subir la imagen:', data);
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
});



