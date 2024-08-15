// Usa el objeto global `supabase` proporcionado por el CDN
const feedContainer = document.getElementById('feed');

async function loadFeed() {
    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*');

        if (error) {
            console.error('Error al cargar el feed:', error);
            return;
        }

        feedContainer.innerHTML = ''; // Limpiar el contenedor

        posts.forEach(post => {
            const item = document.createElement('div');
            item.classList.add('item');

            // Crear y añadir la imagen
            const img = document.createElement('img');
            img.src = `https://ukuvffbluwfmoqxbjrms.supabase.co/storage/v1/object/public/images/${post.imageUrl}`;
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


