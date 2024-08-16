document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed');

    // Recuperar los posts guardados
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (posts.length) {
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
        feedContainer.innerHTML = '<p>No hay hitos históricos publicados aún.</p>';
    }
});

