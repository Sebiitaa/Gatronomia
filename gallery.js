// Configuración de Supabase
const supabaseUrl = 'https://ukuvffbluwfmoqxbjrms.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdXZmZmJsdXdmbW9xeGJqcm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3NTIzNjAsImV4cCI6MjAzOTMyODM2MH0.FNARtf3lSBZ0kdgg0zwGgoXxYjTaf9yPrLPQP1opjAo';
const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

// Manejador del formulario
document.getElementById('post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    if (!image) {
        alert('Por favor, selecciona una imagen.');
        return;
    }

    // Subir la imagen a Supabase Storage
    const { data: imageData, error: imageError } = await supabase
        .storage
        .from('images')
        .upload(`public/${image.name}`, image);

    if (imageError) {
        console.error('Error al subir la imagen:', imageError);
        return;
    }

    // Obtener la URL de la imagen subida
    const { publicURL, error: urlError } = supabase
        .storage
        .from('images')
        .getPublicUrl(`public/${image.name}`);

    if (urlError) {
        console.error('Error al obtener la URL de la imagen:', urlError);
        return;
    }

    // Insertar los datos del hito en la base de datos
    const { error: insertError } = await supabase
        .from('posts')
        .insert([{ title, description, imageUrl: publicURL }]);

    if (insertError) {
        console.error('Error al insertar el hito:', insertError);
        return;
    }

    alert('¡Hito publicado con éxito!');
    document.getElementById('post-form').reset();
});


