document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed');

    // Recuperar los posts guardados en localStorage
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(post => {
        const item = document.createElement('div');
        item.classList.add('item');

        // Crear y añadir la imagen
        const img = document.createElement('img');
        img.src = post.imageUrl;
        item.appendChild(img);

        // Añadir el item al contenedor del feed
        feedContainer.appendChild(item);
    });
});
