const cloudName = 'dqgzxa6uk'; // Asegúrate de que este es tu Cloud Name real
const uploadPreset = 'imagenes'; // Asegúrate de que este es el nombre correcto de tu upload preset

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

            console.log('Imagen subida exitosamente:', imageUrl);

            const post = {
                title: title,
                description: description,
                imageUrl: imageUrl,
            };

            localStorage.setItem('posts', JSON.stringify(post));
            
            alert('Hito Histórico publicado exitosamente.');
            window.location.href = 'feed.html';
        } else {
            console.error('Error al subir la imagen:', data.error.message);
            alert(`Error al subir la imagen: ${data.error.message}`);
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
});



