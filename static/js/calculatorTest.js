// script.js

// Classe représentant une Note
// Classe représentant une Note
class Note {
    constructor(htmlParent) {
        this.note = 10;
        this.coef = 1;
        this.locked = false;

        // Elements HTML de la note
        this.lockedCheckbox = null;
        this.noteInput = null;
        this.coefInput = null;
        this.htmlParent = htmlParent;
        this.deleteButton = null;

        this.createHtml();
        this.setupListeners();
        this.updateHtmlFromAttributes();
    }

    createHtml() {
        //     <li class="file" role="treeitem">
        //     <span class="label">Note 5</span>
        //     <span class="attributes">
        //       <label>Note: <input type="number" value="0" aria-label="Note 5 pour Matière A"></label>
        //       <label>Coeff: <input type="number" value="1" aria-label="Coeff de Note 5"></label>
        //     </span>
        //   </li>

        let li = document.createElement('li');
        li.className = 'file';
        li.setAttribute('role', 'treeitem');
        this.htmlParent.appendChild(li);

        let span2 = document.createElement('span');
        span2.className = 'attributes';
        li.appendChild(span2);

        let label = document.createElement('label');
        label.textContent = 'Note : ';
        span2.appendChild(label);

        // Input pour la note
        let input = document.createElement('input');
        input.type = 'number';
        input.value = '10';
        input.step = '0.1';
        input.setAttribute('aria-label', 'Note 5 pour Matière A');
        input.classList.add('note-note-input');
        span2.appendChild(input);

        let label2 = document.createElement('label');
        label2.textContent = 'Coeff : ';
        span2.appendChild(label2);

        // Input pour le coefficient
        let input2 = document.createElement('input');
        input2.type = 'number';
        input2.value = '1';
        input2.step = '0.1';
        input2.setAttribute('aria-label', 'Coeff de Note 5');
        input2.classList.add('note-coef-input');
        span2.appendChild(input2);

        let label3 = document.createElement('label');
        // On initialise le label avec l'icône du cadenas ouvert (si décoché par défaut)
        label3.textContent = '🔒';
        span2.appendChild(label3);

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'lock';
        checkbox.setAttribute('aria-label', 'Verrouiller la note');
        span2.appendChild(checkbox);

        let button = document.createElement('button');
        button.className = 'delete-btn';
        button.setAttribute('aria-label', 'Supprimer la note');
        button.textContent = '🗑️';
        span2.appendChild(button);

        this.lockedCheckbox = checkbox;
        this.noteInput = input;
        this.coefInput = input2;
        this.deleteButton = button;
    }

    setupListeners() {
        // Mise à jour des attributs de la note à chaque changement de l'input
        this.lockedCheckbox.addEventListener('change', (e) => {
            this.locked = this.lockedCheckbox.checked;
        });

        this.deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.htmlParent.removeChild(this.deleteButton.parentElement.parentElement);
        });

        // Mise à jour des attributs de la note à chaque changement de l'input
        this.noteInput.addEventListener('input', (e) => {
            this.note = parseFloat(this.noteInput.value);
            this.updateHtmlFromAttributes();
        });

        // Mise à jour des attributs de la note à chaque changement de l'input
        this.coefInput.addEventListener('input', (e) => {
            this.coef = parseFloat(this.coefInput.value);
            this.updateHtmlFromAttributes();
        });
    }

    updateHtmlFromAttributes() {
        this.noteInput.value = this.note;
        this.coefInput.value = this.coef;
        this.lockedCheckbox.checked = this.locked;
    }

}


// Classe représentant une Matière
class Matiere {
    constructor(htmlParent) {
        this.notes = [];
        this.coef = 1;
        this.moyenne = 10;

        // Elements HTML de la matière
        this.coefInput = null;
        this.moyenneInput = null;
        this.htmlChilds = null;
        this.htmlParent = htmlParent;
        this.addChildButton = null;
        this.collapseButton = null;
        this.deleteButton = null;

        this.createHtml();
        this.setupListeners();

        // Création d'une note par défaut
        this.notes.push(new Note(this.htmlChilds));
    }

    createHtml() {
        let li = document.createElement('li');
        li.className = 'folder';
        li.setAttribute('role', 'treeitem');
        li.setAttribute('aria-expanded', 'true');
        this.htmlParent.appendChild(li);

        // Bouton pour replier/déplier la Matière
        let button = document.createElement('button');
        button.className = 'toggle-btn';
        button.setAttribute('aria-label', 'Réduire/Développer');
        button.textContent = '🔼';
        li.appendChild(button);

        // Label de la Matière
        let span = document.createElement('span');
        span.className = 'label';
        span.textContent = 'Matière A';
        li.appendChild(span);

        // Attributs de la Matière (Note globale, Coeff)
        let span2 = document.createElement('span');
        span2.className = 'attributes';
        li.appendChild(span2);

        let label = document.createElement('label');
        label.textContent = 'Note : ';
        span2.appendChild(label);

        // Input pour la moyenne de la matière
        let input = document.createElement('input');
        input.type = 'number';
        input.value = '10';
        input.step = '0.1';
        input.setAttribute('aria-label', 'Note pour Matière A (UE1)');
        input.classList.add('matiere-note-input');
        span2.appendChild(input);

        let label2 = document.createElement('label');
        label2.textContent = 'Coeff : ';
        span2.appendChild(label2);

        // Input pour le coefficient de la matière
        let input2 = document.createElement('input');
        input2.type = 'number';
        input2.value = '1';
        input2.step = '0.1';
        input2.setAttribute('aria-label', 'Coeff pour Matière A (UE1)');
        input2.classList.add('matiere-coef-input');
        span2.appendChild(input2);

        // Sous-liste (UL) pour les Notes
        let ul = document.createElement('ul');
        ul.setAttribute('role', 'group');
        li.appendChild(ul);

        // Bouton pour supprimer la matière
        let button3 = document.createElement('button');
        button3.className = 'delete-btn';
        button3.setAttribute('aria-label', 'Supprimer la matière');
        button3.textContent = '🗑️';
        ul.appendChild(button3);

        // Bouton pour ajouter une note
        let button2 = document.createElement('button');
        button2.className = 'add-btn';
        button2.setAttribute('aria-label', 'Ajouter une note');
        button2.textContent = '+ Note';
        ul.appendChild(button2);



        // Stockage dans l'objet pour usage ultérieur
        this.moyenneInput = input;
        this.coefInput = input2;
        this.htmlChilds = ul;
        this.addChildButton = button2;
        this.collapseButton = button
        this.deleteButton = button3;
    }

    setupListeners() {
        // Système de collapse/expand
        this.collapseButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.htmlChilds.classList.toggle('hidden');
            if (this.htmlChilds.classList.contains('hidden')) {
                this.collapseButton.textContent = '🔽';
            } else {
                this.collapseButton.textContent = '🔼';
            }
        });

        // Ajout d'une note
        this.addChildButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.notes.push(new Note(this.htmlChilds));
        });

        // Suppression de la matière
        this.deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.notes = [];
            this.htmlParent.removeChild(this.htmlChilds.parentElement);
        });
    }

    updateHtmlFromAttributes() {
        this.moyenneInput.value = this.moyenne;
        this.coefInput.value = this.coef;
    }
}




// Classe représentant une UE
class UE {
    constructor(htmlParent) {
        this.matieres = [];
        this.coef = 1;
        this.moyenne = 10;

        // Elements HTML de l'UE
        this.coefInput = null;
        this.moyenneInput = null;
        this.htmlChilds = null;
        this.htmlParent = htmlParent;
        this.addChildButton = null;
        this.collapseButton = null;
        this.deleteButton = null;

        this.createHtml();
        this.setupListeners();

        // Création d'une matière par défaut
        this.matieres.push(new Matiere(this.htmlChilds));
    }

    createHtml() {
        // <li class="folder" role="treeitem" aria-expanded="true">
        // <button class="toggle-btn" aria-label="Réduire/Développer">🔼</button>
        // <span class="label">UE 1</span>
        // <span class="attributes">
        //   <label>Note: <input type="number" value="0" aria-label="Note pour UE 1"></label>
        //   <label>Coeff: <input type="number" value="1" aria-label="Coeff pour UE 1"></label>
        // </span>
        // <ul role="group">

        let li = document.createElement('li');
        li.className = 'folder';
        li.setAttribute('role', 'treeitem');
        li.setAttribute('aria-expanded', 'true');
        this.htmlParent.appendChild(li);

        let button = document.createElement('button');
        button.className = 'toggle-btn';
        button.setAttribute('aria-label', 'Réduire/Développer');
        button.textContent = '🔼';
        li.appendChild(button);

        let span = document.createElement('span');
        span.className = 'label';
        span.textContent = 'UE 1';
        li.appendChild(span);

        let span2 = document.createElement('span');
        span2.className = 'attributes';
        li.appendChild(span2);

        let label = document.createElement('label');
        label.textContent = 'Note : ';
        span2.appendChild(label);

        // Input pour la moyenne de l'UE
        let input = document.createElement('input');
        input.type = 'number';
        input.value = '10';
        input.step = '0.1';
        input.setAttribute('aria-label', 'Note pour UE 1');
        input.classList.add('ue-note-input');
        span2.appendChild(input);

        let label2 = document.createElement('label');
        label2.textContent = 'Coeff : ';
        span2.appendChild(label2);

        // Input pour le coefficient de l'UE
        let input2 = document.createElement('input');
        input2.type = 'number';
        input2.value = '1';
        input2.step = '0.1';
        input2.setAttribute('aria-label', 'Coeff pour UE 1');
        input2.classList.add('ue-coef-input');
        span2.appendChild(input2);

        let ul = document.createElement('ul');
        ul.setAttribute('role', 'group');
        li.appendChild(ul);

        // Bouton pour supprimer l'UE
        let button3 = document.createElement('button');
        button3.className = 'delete-btn';
        button3.setAttribute('aria-label', 'Supprimer l\'UE');
        button3.textContent = '🗑️';
        ul.appendChild(button3);

        // Bouton pour ajouter une note
        let button2 = document.createElement('button');
        button2.className = 'add-btn';
        button2.setAttribute('aria-label', 'Ajouter une note');
        button2.textContent = '+ Matière';
        ul.appendChild(button2);

        this.addChildButton = button2;
        this.moyenneInput = input;
        this.coefInput = input2;
        this.htmlChilds = ul;
        this.collapseButton = button;
        this.deleteButton = button3
    }

    setupListeners() {
        // Système de collapse/expand
        this.collapseButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.htmlChilds.classList.toggle('hidden');
            if (this.htmlChilds.classList.contains('hidden')) {
                this.collapseButton.textContent = '🔽';
            } else {
                this.collapseButton.textContent = '🔼';
            }
        });

        // Ajout d'une matière
        this.addChildButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.matieres.push(new Matiere(this.htmlChilds));
        });

        // Suppression de l'UE
        this.deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.matieres = [];
            this.htmlParent.removeChild(this.htmlChilds.parentElement);
        });
    }

    updateHtmlFromAttributes() {
        this.moyenneInput.value = this.moyenne;
        this.coefInput.value = this.coef;
    }
}

// Classe principale qui gère l'ensemble du calculateur
class Global {
    constructor() {
        // Attributs
        this.UEs = [];
        this.moyenne = 0;

        // Element HTML du calculateur
        this.moyenneInput = null;
        this.htmlChilds = null;
        this.addChildButton = null;
        this.collapseButton = null;

        this.createHtml();

        this.setupListeners();
    }

    // Méthode initiale de création de l'arbre HTML
    createHtml() {
        // <div class="tree" role="tree">
        // <ul>
        //   <li class="folder" role="treeitem" aria-expanded="true">
        //     <button class="toggle-btn" aria-label="Réduire/Développer">🔼</button>
        //     <span class="label">Global</span>
        //     <span class="attributes">
        //       <label>Moyenne : <input type="number" value="0" aria-label="Note pour Programme"></label>
        //     </span>
        //     <ul role="group">

        let div = document.createElement('div');
        div.className = 'tree';
        div.setAttribute('role', 'tree');

        let ul = document.createElement('ul');
        div.appendChild(ul);

        let li = document.createElement('li');
        li.className = 'folder';
        li.setAttribute('role', 'treeitem');
        li.setAttribute('aria-expanded', 'true');
        ul.appendChild(li);

        let button = document.createElement('button');
        button.className = 'toggle-btn';
        button.setAttribute('aria-label', 'Réduire/Développer');
        button.textContent = '🔼';
        li.appendChild(button);

        let span = document.createElement('span');
        span.className = 'label';
        span.textContent = 'Global';
        li.appendChild(span);

        let span2 = document.createElement('span');
        span2.className = 'attributes';
        li.appendChild(span2);

        let label = document.createElement('label');
        label.textContent = 'Moyenne : ';
        span2.appendChild(label);

        // Input pour la moyenne générale
        let input = document.createElement('input');
        input.type = 'number';
        input.value = '0';
        input.step = '0.1';
        input.setAttribute('aria-label', 'Note pour Programme');
        span2.appendChild(input);

        let ul2 = document.createElement('ul');
        ul2.setAttribute('role', 'group');
        li.appendChild(ul2);


        // Bouton pour ajouter une note
        let button2 = document.createElement('button');
        button2.className = 'add-btn';
        button2.setAttribute('aria-label', 'Ajouter une note');
        button2.textContent = '+ Unité d\'Enseignement';
        ul2.appendChild(button2);

        document.body.appendChild(div);

        this.collapseButton = button;
        this.addChildButton = button2;
        this.moyenneInput = input;
        this.htmlChilds = ul2;
    }

    setupListeners() {
        // Système de collapse/expand
        this.collapseButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.htmlChilds.classList.toggle('hidden');
            if (this.htmlChilds.classList.contains('hidden')) {
                this.collapseButton.textContent = '🔽';
            } else {
                this.collapseButton.textContent = '🔼';
            }
        });

        // Ajout d'une UE
        this.addChildButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.UEs.push(new UE(this.htmlChilds));
        });

        // Mise à jour de la moyenne générale à chaque changement de l'input
        document.body.addEventListener('input', (e) => {
            if (e.target.matches('.note-note-input, .note-coef-input')) {
                this.updateAllMoyennesFromNotes();
                this.updateAllMoyennesFromNotes();
                this.updateAllMoyennesFromNotes();
            }
        });
    }

    updateHtmlFromAttributes() {
        this.moyenneInput.value = this.moyenne;
    }

    updateAllMoyennesFromNotes() {
        this.debug();
        let sommeUEs = 0;
        let sommeCoeffsUE = 0;
        this.UEs.forEach((ue) => {
            sommeUEs += ue.moyenne * ue.coef;
            sommeCoeffsUE += ue.coef;
            let sommeMatieres = 0;
            let sommeCoeffsMat = 0;
            ue.matieres.forEach((matiere) => {
                sommeMatieres += matiere.moyenne * matiere.coef;
                sommeCoeffsMat += matiere.coef;
                let sommeNotes = 0;
                let sommeCoeffsNotes = 0;
                matiere.notes.forEach((note) => {
                    sommeNotes += note.note * note.coef;
                    sommeCoeffsNotes += note.coef;
                });
                matiere.moyenne = sommeNotes / sommeCoeffsNotes;
                matiere.updateHtmlFromAttributes();
            });
            ue.moyenne = sommeMatieres / sommeCoeffsMat;
            ue.updateHtmlFromAttributes();
        });
        this.moyenne = sommeUEs / sommeCoeffsUE;
        this.updateHtmlFromAttributes();
    }


    debug() {
        // clear the console
        console.clear();
        console.log('DEBUG');
        for (let ue of this.UEs) {
            console.log('UE', ue.moyenne, ue.coef);
            for (let matiere of ue.matieres) {
                console.log('  Matiere', matiere.moyenne, matiere.coef);
                for (let note of matiere.notes) {
                    console.log('    Note', note.note, note.coef);
                }
            }
        }
    }

}



// Dès que le DOM est chargé, on vide le body et on initialise le calculateur
document.addEventListener('DOMContentLoaded', () => {
    const global = new Global();
});




