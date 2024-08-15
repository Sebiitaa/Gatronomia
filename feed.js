// Configuración de Supabase
const supabaseUrl = 'https://ukuvffbluwfmoqxbjrms.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdXZmZmJsdXdmbW9xeGJqcm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3NTIzNjAsImV4cCI6MjAzOTMyODM2MH0.FNARtf3lSBZ0kdgg0zwGgoXxYjTaf9yPrLPQP1opjAo';
const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

// Función para cargar el feed de hitos históricos
async function loadFeed() {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*');

    if (error) {
        console.error('Error al cargar los hitos históricos:', error);
        return;
    }

    const feedContainer = document.getElementById('feed');

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const imageElement = document.createElement('img');
        imageElement.src = post.imageUrl;
        imageElement.alt = post.title;

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = post.description;

        postElement.appendChild(imageElement);
        postElement.appendChild(titleElement);
        postElement.appendChild(descriptionElement);

        feedContainer.appendChild(postElement);
    });
}

// Cargar el feed al cargar la página
document.addEventListener('DOMContentLoaded', loadFeed);

