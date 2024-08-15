// Asegúrate de que este código esté al principio del archivo
const { createClient } = supabase;
const supabaseUrl = 'https://ukuvffbluwfmoqxbjrms.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdXZmZmJsdXdmbW9xeGJqcm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3NTIzNjAsImV4cCI6MjAzOTMyODM2MH0.FNARtf3lSBZ0kdgg0zwGgoXxYjTaf9yPrLPQP1opjAo';
const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById('post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    if (!title || !description || !image) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Subir imagen a Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(`public/${image.name}`, image);

    if (uploadError) {
        console.error('Error al subir la imagen:', uploadError);
        return;
    }

    const imageUrl = uploadData.path;

    // Insertar datos en la tabla posts
    const { data, error } = await supabase
        .from('posts')
        .insert([{ title, description, imageUrl }]);

    if (error) {
        console.error('Error al insertar el post:', error);
    } else {
        alert('Hito Histórico publicado exitosamente.');
        window.location.href = 'feed.html';
    }
});

