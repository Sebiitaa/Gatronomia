const cloudName = 'tu_cloud_name';  // Reemplaza con tu cloud name

async function loadFeed() {
    try {
        // Aquí deberías obtener las URLs de las imágenes desde tu base de datos, en este ejemplo se usa una lista fija
        const posts = [
            { title: 'Título Ejemplo', description: 'Descripción Ejemplo', imageUrl: 'https://res.cloudinary.com/tu_cloud_name/image/upload/v1234567890/imagen.jpg' }
        ];

        const feedContainer = document.getElementById('feed');
        feedContainer.innerHTML = ''; // Limpiar el contenedor

        posts.forEach(post => {
            const item = document.createElement('div');
            item.classList.add('item');

            // Crear y añadir la imagen
            const img = document.createElement('img');
            img.src = post.imageUrl;
            item.appendChild(img);

            // Crear y añadir el título
            const titleElement = document.createElement('div');
            titleElement.classList.add('title');
            titleElement.textContent = post.title;
            item.appendChild(titleElement);

            // Crear y añadir la descripción
            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('description');
            descriptionElement.textContent = post.description;
            item.appendChild(descriptionElement);

            // Añadir el item al contenedor del feed
            feedContainer.appendChild(item);
        });
    } catch (error) {
        console.error('Error al cargar el feed:', error);
    }
}

loadFeed();






