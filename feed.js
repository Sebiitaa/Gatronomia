document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed');

    if (!feedContainer) {
        console.error('Contenedor del feed no encontrado.');
        return;
    }

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dqgzxa6uk/resources/image');
            if (!response.ok) {
                throw new Error('Error al obtener los posts');
            }
            const data = await response.json();
            return data.resources || [];
        } catch (error) {
            console.error('Error al obtener los posts:', error);
            return [];
        }
    };

    const displayPosts = async () => {
        const posts = await fetchPosts();

        if (Array.isArray(posts)) {
            posts.forEach(post => {
                const item = document.createElement('div');
                item.classList.add('item');

                // Crear y añadir la imagen
                const img = document.createElement('img');
                img.src = post.secure_url;
                item.appendChild(img);

                // Crear y añadir el título
                const titleElement = document.createElement('div');
                titleElement.classList.add('title');
                titleElement.textContent = post.title || 'Sin título';
                item.appendChild(titleElement);

                // Crear y añadir la descripción
                const descriptionElement = document.createElement('div');
                descriptionElement.classList.add('description');
                descriptionElement.textContent = post.description || 'Sin descripción';
                item.appendChild(descriptionElement);

                // Crear y añadir el botón de eliminar
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => {
                    deletePost(post.public_id);
                    item.remove();
                });
                item.appendChild(deleteButton);

                // Añadir el item al contenedor del feed
                feedContainer.appendChild(item);
            });
        } else {
            console.error('La respuesta de la API no es un array.');
        }
    };

    const deletePost = async (publicId) => {
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dqgzxa6uk/image/destroy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    public_id: publicId,
                    api_key: '115171596876627',
                    timestamp: Math.floor(Date.now() / 1000),
                    signature: generateSignature('QKG7iknbqpdABo9voM_1a1EZ_zk', publicId),
                }),
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la imagen');
            }

            const result = await response.json();
            console.log('Imagen eliminada:', result);
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
        }
    };

    const generateSignature = (apiSecret, publicId) => {
        // Función para generar la firma para la eliminación de imágenes
        const signatureString = `public_id=${publicId}&api_key=115171596876627&timestamp=${Math.floor(Date.now() / 1000)}${apiSecret}`;
        return CryptoJS.SHA1(signatureString).toString(CryptoJS.enc.Hex);
    };

    displayPosts();
});
