import { supabase } from './supabase-config.js';

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



