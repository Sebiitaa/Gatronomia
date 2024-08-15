// gallery.js
import { supabase } from './supabase-config.js'

document.getElementById('post-form').addEventListener('submit', async (event) => {
    event.preventDefault()

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const fileInput = document.getElementById('image')
    const file = fileInput.files[0]

    if (!file) {
        alert('Por favor selecciona una imagen')
        return
    }

    // Subir archivo a Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('images')
        .upload(`public/${file.name}`, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (uploadError) {
        console.error('Error al subir la imagen:', uploadError)
        return
    }

    // Obtener la URL pública de la imagen
    const { publicURL, error: urlError } = supabase
        .storage
        .from('images')
        .getPublicUrl(`public/${file.name}`)

    if (urlError) {
        console.error('Error al obtener la URL pública:', urlError)
        return
    }

    // Insertar datos en la base de datos
    const { error: dbError } = await supabase
        .from('posts')
        .insert([{ title, description, imageUrl: publicURL }])

    if (dbError) {
        console.error('Error al guardar los datos:', dbError)
        return
    }

    alert('Hito publicado con éxito')
})

