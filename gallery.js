const cloudName = 'tu_cloud_name';  // Reemplaza con tu cloud name
const uploadPreset = 'Imagenes';    // El nombre del upload preset

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

            // Aquí puedes almacenar la URL de la imagen en tu base de datos si es necesario
            console.log('Imagen subida exitosamente:', imageUrl);
            alert('Hito Histórico publicado exitosamente.');
            window.location.href = 'feed.html';
        } else {
            console.error('Error al subir la imagen:', data);
        }
    } catch (error) {
        console.error('Error en la solicitud de carga:', error);
    }
});


