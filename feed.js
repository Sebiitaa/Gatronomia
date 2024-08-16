document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed');

    // Recuperar los posts guardados (esto es un ejemplo, en un proyecto real lo sacarías de una base de datos)
    const posts = JSON.parse(localStorage.getItem('posts'));

    if (posts) {
        const item = document.createElement('div');
        item.classList.add('item');

        // Crear y añadir la imagen
        const img = document.createElement('img');
        img.src = posts.imageUrl;
        item.appendChild(img);

        // Crear y añadir el título
        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.textContent = posts.title;
        item.appendChild(titleElement);

        // Crear y añadir la descripción
        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('description');
        descriptionElement.textContent = posts.description;
        item.appendChild(descriptionElement);

        // Añadir el item al contenedor del feed
        feedContainer.appendChild(item);
    }
});







