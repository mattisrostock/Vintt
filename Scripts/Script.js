document.addEventListener("DOMContentLoaded", function () {
    // Alle a-Tags im Inhaltsverzeichnis holen
    document.querySelectorAll('#JahresarbeitInhaltsangabe li a').forEach(function(a) {
        // href="#ID" → ID extrahieren
        const id = a.getAttribute('href').replace('#', '');
        // Wenn ein Element mit dieser ID existiert, setze den Text des Links auf die ID
        if (document.getElementById(id)) {
            a.textContent = id;
        }
    });
});

document.querySelectorAll("#JahresarbeitText > div > h1").forEach(h1 => {
  const parentId = h1.parentElement.id;
  h1.textContent = parentId;
});

document.querySelectorAll("#JahresarbeitText > div > div > h2").forEach(h2 => {
  const parentId = h2.parentElement.id;
  h2.textContent = parentId;
});

// Load text content for each section dynamically
document.querySelectorAll('#JahresarbeitText div').forEach(section => {
  const id = section.id;
  const p = section.querySelector('p');

  if (id && p) {
    // Load corresponding .txt file
    fetch(`../Texts/${id}.txt`)
      .then(response => {
        if (!response.ok) throw new Error(`Missing: ${id}.txt`);
        return response.text();
      })
      .then(data => {
        p.innerText = data;
      })
      .catch(err => {
        console.warn(err);
        p.innerText = '[Text nicht gefunden]';
      });
  }
});
const filename = id.replace(/[^a-z0-9]/gi, '-');