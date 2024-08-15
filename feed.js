<<<<<<< HEAD
import { supabase } from './supabase-config.js';
=======
import { db } from './firebase-config.js';
import { collection, getDocs } from 'firebase/firestore';
>>>>>>> 3fc62965fc6d7ce175d79ea3d1b7d018d8ec4cd7

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

<<<<<<< HEAD
        posts.forEach((post) => {
=======
        querySnapshot.forEach((doc) => {
            const data = doc.data();

>>>>>>> 3fc62965fc6d7ce175d79ea3d1b7d018d8ec4cd7
            const item = document.createElement('div');
            item.classList.add('item');

            // Crear y añadir la imagen
            const img = document.createElement('img');
<<<<<<< HEAD
            img.src = post.imageUrl;
=======
            img.src = data.imageUrl; // Usar la URL directamente
            img.onload = () => feedContainer.appendChild(item); // Añadir al feed después de cargar la imagen
            img.onerror = () => {
                console.error('Error al cargar la imagen:', data.imageUrl);
                item.innerHTML = 'Error al cargar imagen'; // Mensaje de error
            };
>>>>>>> 3fc62965fc6d7ce175d79ea3d1b7d018d8ec4cd7
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
