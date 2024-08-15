import { db, collection, getDocs, query, orderBy } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const feedSection = document.getElementById('feed');

    // Consultar las publicaciones en Firestore
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    // Mostrar las publicaciones
    querySnapshot.forEach(doc => {
        const post = doc.data();
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <img src="${post.imageUrl}" alt="${post.title}">
            <h3>${post.title}</h3>
            <p>${post.description}</p>
        `;
        feedSection.appendChild(postElement);
    });
});
