<<<<<<< HEAD
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

    const imageUrl = `https://your-project-id.supabase.co/storage/v1/object/public/images/${imageData.path}`;

    // Guardar datos en la base de datos
    const { error: insertError } = await supabase
        .from('posts')
        .insert([{ title, description, imageUrl }]);

    if (insertError) {
        console.error('Error al guardar los datos:', insertError);
    } else {
        alert('Hito publicado con éxito');
        document.getElementById('post-form').reset();
=======
import { db, storage } from './firebase-config.js';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const form = document.getElementById('uploadForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const fileInput = document.getElementById('file');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const description = descriptionInput.value;
    const file = fileInput.files[0];

    if (file) {
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            null,
            (error) => {
                console.error('Error al subir la imagen:', error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await addDoc(collection(db, 'posts'), {
                        title: title,
                        description: description,
                        imageUrl: downloadURL,
                        timestamp: new Date()
                    });
                    alert('Hito publicado con éxito!');
                    form.reset();
                } catch (error) {
                    console.error('Error al guardar la información en Firestore:', error);
                }
            }
        );
>>>>>>> 3fc62965fc6d7ce175d79ea3d1b7d018d8ec4cd7
    }
});


