// feed.js

document.addEventListener('DOMContentLoaded', async () => {
    const feedContainer = document.getElementById('feed');

    // Recuperar los posts desde Cloudinary (o tu base de datos)
    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dqgzxa6uk/resources/image');
        const data = await response.json();
        
        data.resources.forEach(post => {
            const item = document.createElement('div');
            item.classList.add('item');

            // Crear y añadir la imagen
            const img = document.createElement('img');
            img.src = post.secure_url;
            item.appendChild(img);

            // Crear y añadir el título
            const titleElement = document.createElement('div');
            titleElement.classList.add('title');
            titleElement.textContent = post.public_id; // Asegúrate de ajustar según tu esquema
            item.appendChild(titleElement);

            // Crear y añadir la descripción
            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('description');
            descriptionElement.textContent = post.context?.custom?.description || 'No description';
            item.appendChild(descriptionElement);

            // Añadir el botón de eliminar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', async () => {
                try {
                    const deleteResponse = await fetch(`https://api.cloudinary.com/v1_1/dqgzxa6uk/image/destroy`, {
                        method: 'POST',
                        body: JSON.stringify({ public_id: post.public_id }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic ' + btoa('your_api_key:your_api_secret')
                        }
                    });

                    if (!deleteResponse.ok) {
                        throw new Error('Error al eliminar la imagen');
                    }

                    // Actualiza la vista después de eliminar
                    item.remove();
                } catch (error) {
                    console.error('Error al eliminar la imagen:', error);
                }
            });
            item.appendChild(deleteButton);

            // Añadir el item al contenedor del feed
            feedContainer.appendChild(item);
        });
    } catch (error) {
        console.error('Error al recuperar las imágenes:', error);
    }
});
