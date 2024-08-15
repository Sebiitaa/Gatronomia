import { supabase } from './supabase-config.js';

document.getElementById('post-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    // Subir imagen
    const { data: imageData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(`public/${Date.now()}_${image.name}`, image);

    if (uploadError) {
        console.error('Error al subir la imagen:', uploadError);
        return;
    }

    const imageUrl = `${supabase.storageUrl}/images/${imageData.path}`;

    // Guardar datos en la base de datos
    const { error: insertError } = await supabase
        .from('posts')
        .insert([{ title, description, imageUrl }]);

    if (insertError) {
        console.error('Error al guardar los datos:', insertError);
    } else {
        alert('Hito publicado con éxito');
        document.getElementById('post-form').reset();
    }
});


