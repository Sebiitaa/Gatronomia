document.addEventListener('DOMContentLoaded', async () => {
    const feedContainer = document.getElementById('feed');
    const cloudinaryURL = 'https://res.cloudinary.com/dqgzxa6uk/image/upload/'; // Reemplaza YOUR_CLOUD_NAME con tu nombre de nube en Cloudinary
    const cloudinaryPreset = 'Imagenes'; // Reemplaza esto con el nombre de tu preset en Cloudinary

    // Aquí deberías cargar las URLs de las imágenes y sus metadatos (títulos y descripciones)
    const posts = [
        // Aquí puedes agregar los objetos que representen tus imágenes subidas
        {
            id: 'image1',
            title: 'Título 1',
            description: 'Descripción 1',
            imageUrl: `${cloudinaryURL}ruta_de_tu_imagen_1`
        },
        {
            id: 'image2',
            title: 'Título 2',
            description: 'Descripción 2',
            imageUrl: `${cloudinaryURL}ruta_de_tu_imagen_2`
        }
    ];

    // Renderizar el feed
    posts.forEach(post => {
        const item = document.createElement('div');
        item.classList.add('item');

        const img = document.createElement('img');
        img.src = post.imageUrl;

        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = post.title;

        const description = document.createElement('div');
        description.classList.add('description');
        description.textContent = post.description;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Eliminar';

        deleteButton.addEventListener('click', async () => {
            try {
                // Aquí puedes integrar la funcionalidad para eliminar la imagen de Cloudinary usando su API
                const response = await fetch(`https://api.cloudinary.com/v1_1/dqgzxa6uk/image/destroy`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        public_id: post.id, // Usamos el id de la imagen
                        upload_preset: cloudinaryPreset
                    })
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar la imagen');
                }

                // Eliminar el elemento del feed después de eliminar la imagen
                feedContainer.removeChild(item);
            } catch (err) {
                console.error('Error al eliminar el post:', err);
            }
        });

        item.appendChild(img);
        item.appendChild(title);
        item.appendChild(description);
        item.appendChild(deleteButton);

        feedContainer.appendChild(item);
    });
});

