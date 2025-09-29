JSQuiz Advanced

Une application de quiz éducative moderne et ludique, développée en HTML5, CSS3 et JavaScript (ES6+), avec persistance locale et visualisations interactives grâce à Chart.js.  
Ce projet est une évolution du prototype JSQuizStarter et intègre des fonctionnalités avancées de manipulation du DOM, `localStorage`, `async/await`, et d’exports de données.

---

Fonctionnalités

Quiz Dynamique
- Chargement des questions depuis des fichiers JSON (un par thématique : `javascript.json`, `es6.json`, `dom-events.json`…).
- Génération dynamique de toutes les questions et options (aucune question en dur dans le HTML).
- Gestion des questions à réponses multiples.
- Chronomètre par question + chronomètre global.
- Feedback visuel immédiat (réponse correcte/incorrecte).

Historique et Dashboard
- Sauvegarde des parties en localStorage : pseudo, score, date, thématique.
- Statistiques calculées avec `map`, `filter`, `reduce` :
  - Nombre de parties par thématique.
  - Score moyen par thématique.
  - Meilleur score global + classement (Top 3 pseudos).
- Visualisation graphique avec Chart.js :
  - Répartition des parties par thématique (camembert).
  - Courbe de progression des scores dans le temps (line chart).

Exports
- Export des statistiques en JSON.
- Export des statistiques en CSV (compatible Excel).

Bonus
- Reprise d’une partie interrompue (sauvegardée en `localStorage`).
- Mode révision : rejouer uniquement les questions échouées.

---

Technologies utilisées
- HTML5 / CSS3 → Structure & design responsive.  
- JavaScript ES6+ → DOM dynamique, modules, async/await.  
- Chart.js → Visualisation interactive des statistiques.  
- localStorage → Persistance des données côté client.  
- JSON → Fichiers de questions par thématique.  

---

Structure du projet
┣ 📂 Functions
┃ ┣ 📜 chart.js # Gestion des graphiques (Chart.js)
┃ ┣ 📜 export.js # Export JSON & CSV
┃ ┣ 📜 history.js # Gestion de l’historique
┃ ┣ 📜 loadData.js # Chargement des fichiers JSON (fetch + async/await)
┃ ┣ 📜 searchFilter.js # Recherche et filtrage
┃ ┣ 📜 stats.js # Calcul des statistiques
┃ ┣ 📜 timers.js # Chronomètre global et par question
┃ ┣ 📜 uiHelper.js # Fonctions utilitaires pour le DOM
┃ ┗ 📜 uiNavigation.js # Gestion de la navigation UI
┣ 📂 jsonData
┃ ┣ 📜 dom-events.json # Thématique DOM Events
┃ ┣ 📜 es6.json # Thématique ES6
┃ ┣ 📜 javascript.json # Thématique JavaScript
┃ ┗ 📜 manifest.json # Métadonnées
┣ 📜 .gitignore
┣ 📜 index.html # Page principale
┣ 📜 README.md # Documentation
┣ 📜 script.js # Script principal (import des modules)
┗ 📜 style.css # Feuilles de style


Installation et utilisation

1. Cloner le dépôt GitHub :
```bash
git clone https://github.com/votre-utilisateur/JSQuizStarter.git](https://github.com/AsforDounia/JsQuizStarter.git)

2. Lancer l’application :
Ouvrir index.html dans un navigateur moderne (Chrome, Firefox, Edge).

3. Tester en ligne (GitHub Pages) :
[Lien vers l'application] : (https://asfordounia.github.io/JsQuizStarter/)
