document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed');

    // Endpoint de tu API para obtener los posts
    fetch('https://api.cloudinary.com/v1_1/dqgzxa6uk/image/upload')  // Cambia esta URL por la URL real de tu API
        .then(response => response.json())
        .then(posts => {
            if (Array.isArray(posts)) {
                posts.forEach(post => {
                    const item = document.createElement('div');
                    item.classList.add('item');

                    // Crear y añadir la imagen
                    const img = document.createElement('img');
                    img.src = post.imageUrl;  // Asegúrate de que `post.imageUrl` contiene la URL correcta
                    img.style.maxWidth = '100%';  // Ajusta el tamaño de la imagen
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
