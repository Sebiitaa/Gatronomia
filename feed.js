document.addEventListener('DOMContentLoaded', async () => {
    const feedContainer = document.getElementById('feed');

    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dqgzxa6uk/image/upload'); // Cambia esto por tu endpoint real
        const posts = await response.json();

        if (!response.ok) {
            throw new Error(posts.message);
        }

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
});

