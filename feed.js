import { db } from './firebase-config.js';
import { collection, getDocs } from 'firebase/firestore';

const feedContainer = document.getElementById('feed');

async function loadFeed() {
    try {
        const querySnapshot = await getDocs(collection(db, 'posts'));

        feedContainer.innerHTML = ''; // Limpiar el contenedor

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            const item = document.createElement('div');
            item.classList.add('item');

            // Crear y añadir la imagen
            const img = document.createElement('img');
            img.src = data.imageUrl; // Usar la URL directamente
            img.onload = () => feedContainer.appendChild(item); // Añadir al feed después de cargar la imagen
            img.onerror = () => {
                console.error('Error al cargar la imagen:', data.imageUrl);
                item.innerHTML = 'Error al cargar imagen'; // Mensaje de error
            };
            item.appendChild(img);

            // Crear y añadir el título
            const titleElement = document.createElement('div');
            titleElement.classList.add('title');
            titleElement.textContent = data.title;
            item.appendChild(titleElement);

            // Crear y añadir la descripción
            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('description');
            descriptionElement.textContent = data.description;
            item.appendChild(descriptionElement);

            // Añadir el item al contenedor del feed
            feedContainer.appendChild(item);
        });
    } catch (error) {
        console.error('Error al cargar el feed:', error);
    }
}

loadFeed();
