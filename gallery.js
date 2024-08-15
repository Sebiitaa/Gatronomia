// gallery.js

document.getElementById('hito-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const image = document.getElementById('image').files[0];
    const description = document.getElementById('description').value;

    if (title && image && description) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const gallery = document.getElementById('gallery');

            const item = document.createElement('div');
            item.classList.add('item');

            const img = document.createElement('img');
            img.src = e.target.result;
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

            document.getElementById('hito-form').reset();
        };

        reader.readAsDataURL(image);
    }
});

