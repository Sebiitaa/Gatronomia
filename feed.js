document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed');

    // Recuperar los posts guardados del localStorage
    const posts = JSON.parse(localStorage.getItem('posts')) || []; // Asegúrate de que sea un array

    posts.forEach(post => {
        const item = document.createElement('div');
        item.classList.add('item');

        // Crear y añadir la imagen
        const img = document.createElement('img');
        img.src = post.imageUrl;
        img.alt = post.title; // Texto alternativo para la imagen
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

        // Crear y añadir el botón de eliminación
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deletePost(post.title); // Eliminar el post basado en su título o ID
        item.appendChild(deleteButton);

        // Añadir el item al contenedor del feed
        feedContainer.appendChild(item);
    });
});

// Función para eliminar un post
function deletePost(title) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Filtrar los posts para eliminar el seleccionado
    posts = posts.filter(post => post.title !== title);

    // Guardar los posts actualizados en localStorage
    localStorage.setItem('posts', JSON.stringify(posts));

    // Recargar el feed para reflejar los cambios
    document.location.reload();
}








