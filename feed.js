// Crear cliente Supabase usando el CDN
const { createClient } = supabase;
const supabaseUrl = 'https://ukuvffbluwfmoqxbjrms.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdXZmZmJsdXdmbW9xeGJqcm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3NTIzNjAsImV4cCI6MjAzOTMyODM2MH0.FNARtf3lSBZ0kdgg0zwGgoXxYjTaf9yPrLPQP1opjAo';
const supabase = createClient(supabaseUrl, supabaseKey);

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



