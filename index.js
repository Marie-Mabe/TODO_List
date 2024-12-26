/* This is an example JavaScript file, feel free to remove/edit it anytime */

function sauvegarderTaches() {
  localStorage.setItem('taches', JSON.stringify(taches));

}


const taches = [];

const bouton = document.getElementById('bnt');
const userInput = document.getElementById('zonesaisie');
const tachesList = document.getElementById('mestaches');


document.addEventListener('DOMContentLoaded', () => {
  const tachesStockees = JSON.parse(localStorage.getItem('taches')) || [];
  
  tachesStockees.forEach((tache, index) => {
    taches.push(tache);
    ajoutTache(tache, index);
  });
  trierTaches();
  mettreAJourCompteur();
});


userInput.addEventListener('input', function()  {

    if (userInput.value !== '') {
      bouton.style.display = 'inline-block';
    } else {
      bouton.style.display = 'none';
    }
});

function trierTaches() {
  // Étape 1 : Trier la liste des tâches
  taches.sort((a, b) => a.checked - b.checked);

  // Étape 2 : Réinitialiser l'affichage des tâches
  tachesList.innerHTML = '';
  taches.forEach((tache, index) => ajoutTache(tache, index));

  // Étape 3 : Sauvegarder les tâches triées
  sauvegarderTaches();
}


function mettreAJourCompteur() {
  const total = taches.length;
  const terminees = taches.filter(tache => tache.checked).length;

  const compteur = document.getElementById('compteurTaches');
  
  if (total > 0) {
    compteur.style.display = 'block';
    compteur.textContent = `${terminees}/${total} tâches terminées`;
  } else {
    compteur.style.display = 'none';
  }
}



function ajoutTache(tache, index) {
  const li = document.createElement('li');
  li.style.position = 'relative';

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `;
  deleteBtn.classList.add('delete-btn');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = tache.checked;

  const label = document.createElement('span');
  label.textContent = tache.text;

  // Appliquer les styles si la tâche est cochée
  if (tache.checked) {
    label.style.textDecoration = 'line-through';
    label.style.color = 'rgb(181, 181, 181)';
  }

  checkbox.style.accentColor = 'rgb(181, 181, 181)';
  
  checkbox.addEventListener('change', () => {
    taches[index].checked = checkbox.checked;
    if (checkbox.checked) {
      label.style.textDecoration = 'line-through';
      label.style.color = 'rgb(181, 181, 181)';
     
    } else {
      label.style.textDecoration = 'none';
      label.style.color = 'black';
    }
    sauvegarderTaches(); 

    trierTaches();
    mettreAJourCompteur();


});


  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(deleteBtn);
  tachesList.appendChild(li);
 

  li.addEventListener('mouseover', () => {
    deleteBtn.style.display = 'block'; // Affiche le bouton X au survol
  });
  
  li.addEventListener('mouseout', () => {
    deleteBtn.style.display = 'none'; // Cache le bouton X quand la souris quitte
  });

  deleteBtn.addEventListener('click', () => {
    taches.splice(index, 1); // Enlever la tâche de la liste
    li.remove(); // Supprimer la tâche
    sauvegarderTaches();
    mettreAJourCompteur();


    if (taches.length === 0) {
      tachesList.innerHTML = ''; // Si toutes les tâches sont supprimées, vider la liste
    }
  });
}


bouton.addEventListener('click', () => {

  const inputValue = userInput.value.trim();

  if (inputValue !== '') {
    const newTache = { text: inputValue, checked: false };
    taches.push(newTache);
    
    ajoutTache(newTache, taches.length - 1);
    sauvegarderTaches(); 
    trierTaches();
    mettreAJourCompteur();


    userInput.value = '';
    bouton.style.display = 'none';
  } else {
    alert('Veuillez entrer un texte avant d\'ajouter !'); // Alerte si le champ est vide
  }
});

function basculerTheme() {
  const body = document.body;
  const isDarkMode = body.classList.toggle('dark');
  body.classList.toggle('light', !isDarkMode);

  // Mettre à jour l'icône
  const bntToggle = document.querySelector('.toggleBnt');
  bntToggle.innerHTML = isDarkMode
    ? '<img src="assets/icons/light-mode.svg" alt="Light Mode Icon">'
    : '<img src="assets/icons/dark-mode.svg" alt="Dark Mode Icon">';

  // Sauvegarder le thème dans localStorage
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Charger le thème depuis localStorage au démarrage
document.addEventListener('DOMContentLoaded', () => {
  const themeSauvegarde = localStorage.getItem('theme');
  if (themeSauvegarde) {
    document.body.classList.add(themeSauvegarde);
    document.body.classList.remove(themeSauvegarde === 'dark' ? 'light' : 'dark');
  }
  
  const bntToggle = document.querySelector('.toggleBnt');
  bntToggle.addEventListener('click', basculerTheme);
});



