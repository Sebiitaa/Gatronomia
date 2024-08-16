document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed');

    // Recuperar los posts guardados (esto es un ejemplo, en un proyecto real lo sacarías de una base de datos)
    const posts = JSON.parse(localStorage.getItem('posts'));

    if (posts && Array.isArray(posts)) {
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

            // Crear y añadir el botón de eliminar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                // Eliminar el post del localStorage
                const updatedPosts = posts.filter(p => p.imageUrl !== post.imageUrl);
                localStorage.setItem('posts', JSON.stringify(updatedPosts));

                // Eliminar el item del DOM
                item.remove();
            });
            item.appendChild(deleteButton);

            // Añadir el item al contenedor del feed
            feedContainer.appendChild(item);
        });
    }
});


