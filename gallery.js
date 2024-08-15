// Importar las funciones necesarias desde el archivo de configuración de Firebase
import { storage, db, ref, uploadBytes, getDownloadURL, collection, addDoc } from './firebase-config.js';

document.getElementById('hito-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const image = document.getElementById('image').files[0];
    const description = document.getElementById('description').value;

    if (title && image && description) {
        try {
            // Crear una referencia al archivo en Firebase Storage
            const storageRef = ref(storage, 'images/' + image.name);

            // Subir el archivo a Firebase Storage
            await uploadBytes(storageRef, image);

            // Obtener la URL de descarga del archivo
            const imageUrl = await getDownloadURL(storageRef);

            // Guardar la información en Firestore
            await addDoc(collection(db, 'posts'), {
                title: title,
                description: description,
                imageUrl: imageUrl,
                createdAt: new Date()
            });

            // Actualizar la galería local (opcional, ya que la galería en el feed se actualizará al cargar la página)
            const gallery = document.getElementById('gallery');

            const item = document.createElement('div');
            item.classList.add('item');

            const img = document.createElement('img');
            img.src = imageUrl; // Usar la URL de Firebase Storage en lugar de la URL local
            item.appendChild(img);

            const titleElement = document.createElement('div');
            titleElement.classList.add('title');
            titleElement.textContent = title;
            item.appendChild(titleElement);

            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('description');
            descriptionElement.textContent = description;
            item.appendChild(descriptionElement);

            gallery.appendChild(item);

            // Limpiar el formulario
            document.getElementById('hito-form').reset();

            alert('Hito publicado con éxito');
        } catch (error) {
            console.error('Error al publicar el hito:', error);
            alert('Hubo un error al publicar el hito. Inténtalo de nuevo.');
        }
    }
});


