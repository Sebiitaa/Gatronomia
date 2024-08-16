document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed');

    // Recuperar los posts guardados (esto es un ejemplo, en un proyecto real lo sacarías de una base de datos)
    fetch('https://api.cloudinary.com/v1_1/dqgzxa6uk/image/upload')  // Cambia esta URL por tu endpoint de API para obtener los posts
        .then(response => response.json())
        .then(posts => {
            if (Array.isArray(posts)) {
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
            } else {
                console.error('La respuesta de la API no es un array.');
            }
        })
        .catch(error => {
            console.error('Error al obtener los posts:', error);
        });
});
