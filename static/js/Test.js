// script.js

// Classe représentant une Note
class Note {
    constructor(parentMatiere, noteNumber) {
        this.parentMatiere = parentMatiere;
        this.noteNumber = noteNumber;
        this.element = document.createElement('div');
        this.element.className = 'note';

        // Label et input pour la valeur de la note
        const labelNote = document.createElement('label');
        labelNote.textContent = `📝 Note ${this.noteNumber} :`;
        this.valueInput = document.createElement('input');
        this.valueInput.type = 'number';
        this.valueInput.step = '0.1';

        // Label et input pour le coefficient
        const labelCoef = document.createElement('label');
        labelCoef.textContent = '⚖️ Coef :';
        this.coefInput = document.createElement('input');
        this.coefInput.type = 'number';
        this.coefInput.step = '0.1';
        this.coefInput.value = '1';

        // Label et input pour l'état verrouillé
        const labelLocked = document.createElement('label');
        labelLocked.textContent = '🔒';
        this.lockedInput = document.createElement('input');
        this.lockedInput.type = 'checkbox';

        // Bouton pour supprimer la note avec emoji
        this.deleteButton = document.createElement('button');
        this.deleteButton.type = 'button';
        this.deleteButton.textContent = '❌';
        this.deleteButton.addEventListener('click', () => this.delete());

        // Assemblage de la structure de la note
        this.element.appendChild(labelNote);
        this.element.appendChild(this.valueInput);
        this.element.appendChild(labelCoef);
        this.element.appendChild(this.coefInput);
        this.element.appendChild(labelLocked);
        this.element.appendChild(this.lockedInput);
        this.element.appendChild(this.deleteButton);
    }

    // Méthode de suppression de la note
    delete() {
        this.element.remove();
        this.parentMatiere.removeNote(this);
        this.parentMatiere.parentUE.parentCalculator.updateAll();
    }

    // Renvoie la valeur numérique de la note (ou 0 par défaut)
    getValue() {
        return parseFloat(this.valueInput.value) || 0;
    }

    // Renvoie le coefficient de la note (ou 1 par défaut)
    getCoefficient() {
        return parseFloat(this.coefInput.value) || 1;
    }

    // Indique si la note est verrouillée
    isLocked() {
        return this.lockedInput.checked;
    }
}

// Classe représentant une Matière
class Matiere {
    constructor(parentUE, index) {
        this.parentUE = parentUE; // Référence à l'UE parente
        this.element = document.createElement('fieldset');
        this.element.className = 'matiere';
        // Positionnement relatif pour placer le bouton de suppression
        this.element.style.position = 'relative';

        // Création du legend pour la matière
        this.legend = document.createElement('legend');
        this.legend.style.display = 'flex';
        this.legend.style.justifyContent = 'space-between';
        this.legend.style.alignItems = 'center';

        this.legendLeft = document.createElement('span');
        this.legendLeft.className = 'legend-left';

        // Input pour le nom de la matière avec un emoji
        this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';
        this.nameInput.value = 'Matière 🧮';

        // Input pour le coefficient de la matière
        this.coefInput = document.createElement('input');
        this.coefInput.type = 'number';
        this.coefInput.step = '0.1';
        this.coefInput.value = '1';

        this.legendLeft.appendChild(this.nameInput);
        this.legendLeft.appendChild(this.coefInput);

        // Input pour la moyenne de la matière (placé à droite)
        this.moyenneInput = document.createElement('input');
        this.moyenneInput.type = 'number';
        this.moyenneInput.step = '0.1';
        this.moyenneInput.className = 'moyenne-input';

        this.legend.appendChild(this.legendLeft);
        this.legend.appendChild(this.moyenneInput);
        this.element.appendChild(this.legend);

        // Bouton supprimer pour la matière (en haut à droite avec emoji)
        this.deleteButton = document.createElement('button');
        this.deleteButton.type = 'button';
        this.deleteButton.textContent = '❌';
        this.deleteButton.className = 'delete-btn';
        this.deleteButton.style.position = 'absolute';
        this.deleteButton.style.top = '5px';
        this.deleteButton.style.right = '5px';
        this.element.appendChild(this.deleteButton);
        this.deleteButton.addEventListener('click', () => this.delete());

        // Container pour les notes
        this.notesContainer = document.createElement('div');
        this.notesContainer.className = 'notes';
        this.element.appendChild(this.notesContainer);

        // Tableau des notes
        this.notes = [];
        this.addNote(); // Ajoute une note par défaut

        // Bouton pour ajouter une note avec emoji
        this.addNoteButton = document.createElement('button');
        this.addNoteButton.type = 'button';
        this.addNoteButton.textContent = '➕ Ajouter une note';
        this.notesContainer.appendChild(this.addNoteButton);
        this.addNoteButton.addEventListener('click', () => this.addNote());
    }

    // Ajoute une nouvelle note à la matière
    addNote() {
        const note = new Note(this, this.notes.length + 1);
        this.notes.push(note);
        // Insère la note avant le bouton "Ajouter une note"
        this.notesContainer.insertBefore(note.element, this.addNoteButton);
    }

    // Supprime une note du tableau de la matière
    removeNote(note) {
        this.notes = this.notes.filter(n => n !== note);
    }

    // Calcule la moyenne pondérée de la matière en fonction des notes
    computeAverage() {
        let sum = 0;
        let totalCoef = 0;
        this.notes.forEach(note => {
            let value = note.getValue();
            let coef = note.getCoefficient();
            sum += value * coef;
            totalCoef += coef;
        });
        return totalCoef ? (sum / totalCoef) : 0;
    }

    // Met à jour l'input de moyenne de la matière
    updateAverage() {
        this.moyenneInput.value = this.computeAverage().toFixed(2);
    }

    // Supprime la matière de l'interface et du parent UE
    delete() {
        this.element.remove();
        this.parentUE.removeMatiere(this);
        this.parentUE.parentCalculator.updateAll();
    }
}

// Classe représentant une UE
class UE {
    constructor(parentCalculator, index) {
        this.parentCalculator = parentCalculator; // Référence au Calculator
        this.element = document.createElement('fieldset');
        this.element.className = 'ue';
        // Positionnement relatif pour le bouton de suppression
        this.element.style.position = 'relative';

        // Création du legend pour l'UE
        this.legend = document.createElement('legend');
        this.legend.style.display = 'flex';
        this.legend.style.justifyContent = 'space-between';
        this.legend.style.alignItems = 'center';

        this.legendLeft = document.createElement('span');
        this.legendLeft.className = 'legend-left';

        // Input pour le nom de l'UE avec emoji
        this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';
        this.nameInput.value = 'UE 🎓';

        // Input pour le coefficient de l'UE
        this.coefInput = document.createElement('input');
        this.coefInput.type = 'number';
        this.coefInput.step = '0.1';
        this.coefInput.value = '1';

        this.legendLeft.appendChild(this.nameInput);
        this.legendLeft.appendChild(this.coefInput);

        // Input pour la moyenne de l'UE (placé à droite)
        this.moyenneInput = document.createElement('input');
        this.moyenneInput.type = 'number';
        this.moyenneInput.step = '0.1';
        this.moyenneInput.className = 'moyenne-input';

        this.legend.appendChild(this.legendLeft);
        this.legend.appendChild(this.moyenneInput);
        this.element.appendChild(this.legend);

        // Bouton supprimer pour l'UE (en haut à droite avec emoji)
        this.deleteButton = document.createElement('button');
        this.deleteButton.type = 'button';
        this.deleteButton.textContent = '❌';
        this.deleteButton.className = 'delete-btn';
        this.deleteButton.style.position = 'absolute';
        this.deleteButton.style.top = '5px';
        this.deleteButton.style.right = '5px';
        this.element.appendChild(this.deleteButton);
        this.deleteButton.addEventListener('click', () => this.delete());

        // Container pour les matières
        this.matieresContainer = document.createElement('div');
        this.element.appendChild(this.matieresContainer);

        // Tableau des matières
        this.matieres = [];
        this.addMatiere(); // Ajoute une matière par défaut

        // Bouton pour ajouter une matière avec emoji
        this.addMatiereButton = document.createElement('button');
        this.addMatiereButton.type = 'button';
        this.addMatiereButton.textContent = '➕ Ajouter une matière';
        this.element.appendChild(this.addMatiereButton);
        this.addMatiereButton.addEventListener('click', () => this.addMatiere());
    }

    // Ajoute une matière à l'UE
    addMatiere() {
        const matiere = new Matiere(this, this.matieres.length + 1);
        this.matieres.push(matiere);
        this.matieresContainer.appendChild(matiere.element);
    }

    // Supprime une matière du tableau de l'UE
    removeMatiere(matiere) {
        this.matieres = this.matieres.filter(m => m !== matiere);
    }

    // Calcule la moyenne pondérée de l'UE en fonction des moyennes des matières
    computeAverage() {
        let sum = 0;
        let totalCoef = 0;
        this.matieres.forEach(matiere => {
            let avg = parseFloat(matiere.moyenneInput.value) || matiere.computeAverage();
            let coef = parseFloat(matiere.coefInput.value) || 1;
            sum += avg * coef;
            totalCoef += coef;
        });
        return totalCoef ? (sum / totalCoef) : 0;
    }

    // Met à jour l'input de moyenne de l'UE
    updateAverage() {
        this.moyenneInput.value = this.computeAverage().toFixed(2);
    }

    // Supprime l'UE de l'interface et du Calculator
    delete() {
        this.element.remove();
        this.parentCalculator.removeUE(this);
        this.parentCalculator.updateAll();
    }
}

// Classe principale qui gère l'ensemble du calculateur
class Calculator {
    constructor() {
        // Crée et insère le conteneur principal dans le body
        this.container = document.createElement('div');
        this.container.id = 'calculator-container';
        document.body.appendChild(this.container);

        // Création du fieldset pour la note générale avec emoji
        this.noteGeneraleFieldset = document.createElement('fieldset');
        this.noteGeneraleFieldset.className = 'note-generale';
        const noteLeg = document.createElement('legend');
        noteLeg.textContent = 'Note Générale 🌟';
        this.noteGeneraleFieldset.appendChild(noteLeg);
        this.noteGeneraleInput = document.createElement('input');
        this.noteGeneraleInput.type = 'number';
        this.noteGeneraleInput.step = '0.1';
        this.noteGeneraleFieldset.appendChild(this.noteGeneraleInput);
        this.container.appendChild(this.noteGeneraleFieldset);

        // Container pour les UE
        this.ueContainer = document.createElement('div');
        this.ueContainer.id = 'ue-container';
        this.container.appendChild(this.ueContainer);

        this.ues = [];
        this.addUE(); // Ajoute une UE par défaut

        // Bouton pour ajouter une UE avec emoji
        this.addUEButton = document.createElement('button');
        this.addUEButton.type = 'button';
        this.addUEButton.textContent = '➕ Ajouter une UE';
        this.container.appendChild(this.addUEButton);
        this.addUEButton.addEventListener('click', () => this.addUE());
    }

    // Ajoute une UE au calculateur
    addUE() {
        const ue = new UE(this, this.ues.length + 1);
        this.ues.push(ue);
        this.ueContainer.appendChild(ue.element);
    }

    // Supprime une UE du tableau du calculateur
    removeUE(ue) {
        this.ues = this.ues.filter(u => u !== ue);
    }

    // Calcule la moyenne générale en fonction des UE
    computeGeneralAverage() {
        let sum = 0;
        let totalCoef = 0;
        this.ues.forEach(ue => {
            let avg = parseFloat(ue.moyenneInput.value) || ue.computeAverage();
            let coef = parseFloat(ue.coefInput.value) || 1;
            sum += avg * coef;
            totalCoef += coef;
        });
        return totalCoef ? (sum / totalCoef) : 0;
    }

    // Met à jour l'input de la note générale
    updateGeneralAverage() {
        this.noteGeneraleInput.value = this.computeGeneralAverage().toFixed(2);
    }

    // Met à jour toutes les moyennes (matières, UE, générale)
    updateAll() {
        this.ues.forEach(ue => {
            ue.matieres.forEach(matiere => {
                matiere.updateAverage();
            });
            ue.updateAverage();
        });
        this.updateGeneralAverage();
    }
}

// Dès que le DOM est chargé, on vide le body et on initialise le calculateur
document.addEventListener('DOMContentLoaded', () => {
    // Supprime le contenu initial du body
    document.body.innerHTML = '';
    // Initialisation du Calculator
    const calculator = new Calculator();

    // Mise à jour des moyennes dès qu'un input de type number change
    document.body.addEventListener('change', event => {
        if (event.target && event.target.matches('input[type="number"]')) {
            calculator.updateAll();
        }
    });
});
