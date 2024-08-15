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
    }
});


