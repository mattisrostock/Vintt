document.addEventListener("DOMContentLoaded", function() {
    // Dynamically set link text in the table of contents
    document.querySelectorAll('#JahresarbeitInhaltsangabe li a').forEach(function(a) {
        const id = a.getAttribute('href').replace('#', '');
        if (document.getElementById(id)) {
            a.textContent = id;
        }
    });

    // Set h1 text content to parent element's ID
    document.querySelectorAll("#JahresarbeitText > div > h1").forEach(h1 => {
        const parentId = h1.parentElement.id;
        h1.textContent = parentId;
    });

    // Set h2 text content to parent element's ID
    document.querySelectorAll("#JahresarbeitText > div > div > h2").forEach(h2 => {
        const parentId = h2.parentElement.id;
        h2.textContent = parentId;
    });

    // Fetch and display text content for paragraphs
    document.querySelectorAll("#JahresarbeitText div p").forEach(async p => {
        const parentId = p.parentElement.id;
        const filePath = p.parentElement.dataset.file;
        try {
            let response;
            if (filePath) {
                response = await fetch(`../Texts/${filePath}/${parentId}.txt`);
            } else if (parentId) {
                response = await fetch(`../Texts/${parentId}.txt`);
            } else {
                p.innerText = '[Kein Text verfügbar]';
                return;
            }

            if (response.ok) {
                const data = await response.text();
                p.innerText = data;
            } else {
                throw new Error('File not found');
            }
        } catch (err) {
            console.warn(err);
            p.innerText = '[Text nicht gefunden]';
        }
    });

    // Color theme functionality
    const buttons = document.querySelectorAll('.color-button');
    const html = document.documentElement;

    const initialColor = '#36ba98';
    html.style.backgroundColor = initialColor;
    const initialButton = document.querySelector(`.color-button[data-color="${initialColor}"]`);
    if (initialButton) {
        initialButton.classList.add('active');
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const newColor = button.dataset.color;
            html.style.backgroundColor = newColor;
        });
    });
});