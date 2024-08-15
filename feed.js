// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA93i8ti9ToScMxrYEhrfEs-LCGlg5PadM",
    authDomain: "base-de-datos-7c044.firebaseapp.com",
    databaseURL: "https://base-de-datos-7c044-default-rtdb.firebaseio.com",
    projectId: "base-de-datos-7c044",
    storageBucket: "base-de-datos-7c044.appspot.com",
    messagingSenderId: "492201117643",
    appId: "1:492201117643:web:5306795b35be34bc70984e",
    measurementId: "G-GGL68K97V1"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const feedContainer = document.getElementById('feed');

async function loadFeed() {
    try {
        const querySnapshot = await getDocs(collection(db, 'posts'));

        feedContainer.innerHTML = ''; // Limpiar el contenedor

        querySnapshot.forEach(async (doc) => {
            const data = doc.data();

            const item = document.createElement('div');
            item.classList.add('item');

            // Crear y añadir la imagen
            const img = document.createElement('img');
            img.src = await getDownloadURL(ref(storage, 'images/' + data.imageUrl.split('/').pop()));
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
