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
        checkbox.classList.add('note-lock-input');
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

        // Changement de l'icône du cadenas en fonction de l'état du checkbox
        this.lockedCheckbox.addEventListener('change', (e) => {
            this.locked = this.lockedCheckbox.checked;
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
        this.name = 'Matière';

        // Elements HTML de la matière
        this.coefInput = null;
        this.moyenneInput = null;
        this.htmlChilds = null;
        this.nameInput = null;
        this.htmlParent = htmlParent;
        this.addChildButton = null;
        this.collapseButton = null;
        this.deleteButton = null;


        this.createHtml();
        this.setupListeners();
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
        let input = document.createElement('input');
        input.className = 'label, matiere-name-input';
        input.value = 'Matière A';
        li.appendChild(input);

        // Attributs de la Matière (Note globale, Coeff)
        let span2 = document.createElement('span');
        span2.className = 'attributes';
        li.appendChild(span2);

        let label = document.createElement('label');
        label.textContent = 'Note : ';
        span2.appendChild(label);

        // Input pour la moyenne de la matière
        let input2 = document.createElement('input');
        input2.type = 'number';
        input2.value = '10';
        input2.step = '0.1';
        input2.setAttribute('aria-label', 'Note pour Matière A (UE1)');
        input2.classList.add('matiere-note-input');
        span2.appendChild(input2);

        let label2 = document.createElement('label');
        label2.textContent = 'Coeff : ';
        span2.appendChild(label2);

        // Input pour le coefficient de la matière
        let input3 = document.createElement('input');
        input3.type = 'number';
        input3.value = '1';
        input3.step = '0.1';
        input3.setAttribute('aria-label', 'Coeff pour Matière A (UE1)');
        input3.classList.add('matiere-coef-input');
        span2.appendChild(input3);

        // Sous-liste (UL) pour les Notes
        let ul = document.createElement('ul');
        ul.setAttribute('role', 'group');
        li.appendChild(ul);


        // Bouton pour ajouter une note
        let button2 = document.createElement('button');
        button2.className = 'add-btn';
        button2.setAttribute('aria-label', 'Ajouter une note');
        button2.textContent = '+ Note';
        span2.appendChild(button2);

        // Bouton pour supprimer la matière
        let button3 = document.createElement('button');
        button3.className = 'delete-btn';
        button3.setAttribute('aria-label', 'Supprimer la matière');
        button3.textContent = '🗑️';
        span2.appendChild(button3);

        // Stockage dans l'objet pour usage ultérieur
        this.moyenneInput = input2;
        this.coefInput = input3;
        this.htmlChilds = ul;
        this.addChildButton = button2;
        this.collapseButton = button
        this.deleteButton = button3;
        this.nameInput = input;
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
        this.nameInput.value = this.name;
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
        this.nameInput = null;
        this.htmlChilds = null;
        this.htmlParent = htmlParent;
        this.addChildButton = null;
        this.collapseButton = null;
        this.deleteButton = null;

        this.createHtml();
        this.setupListeners();
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

        let input = document.createElement('input');
        input.className = 'label';
        input.value = 'UE 1';
        li.appendChild(input);

        let span2 = document.createElement('span');
        span2.className = 'attributes';
        li.appendChild(span2);

        let label = document.createElement('label');
        label.textContent = 'Note : ';
        span2.appendChild(label);

        // Input pour la moyenne de l'UE
        let input2 = document.createElement('input');
        input2.type = 'number';
        input2.value = '10';
        input2.step = '0.1';
        input2.setAttribute('aria-label', 'Note pour UE 1');
        input2.classList.add('ue-note-input');
        span2.appendChild(input2);

        let label2 = document.createElement('label');
        label2.textContent = 'Coeff : ';
        span2.appendChild(label2);

        // Input pour le coefficient de l'UE
        let input3 = document.createElement('input');
        input3.type = 'number';
        input3.value = '1';
        input3.step = '0.1';
        input3.setAttribute('aria-label', 'Coeff pour UE 1');
        input3.classList.add('ue-coef-input');
        span2.appendChild(input3);

        let ul = document.createElement('ul');
        ul.setAttribute('role', 'group');
        li.appendChild(ul);

        // Bouton pour ajouter une note
        let button2 = document.createElement('button');
        button2.className = 'add-btn';
        button2.setAttribute('aria-label', 'Ajouter une note');
        button2.textContent = '+ Matière';
        span2.appendChild(button2);

        // Bouton pour supprimer l'UE
        let button3 = document.createElement('button');
        button3.className = 'delete-btn';
        button3.setAttribute('aria-label', 'Supprimer l\'UE');
        button3.textContent = '🗑️';
        span2.appendChild(button3);

        this.addChildButton = button2;
        this.moyenneInput = input2;
        this.coefInput = input3;
        this.htmlChilds = ul;
        this.collapseButton = button;
        this.deleteButton = button3
        this.nameInput = input;
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
        this.nameInput.value = this.name;
    }
}

class Global {
    constructor() {
        // Attributs
        this.UEs = [];
        this.moyenne = 0;

        // Eléments HTML du calculateur
        this.moyenneInput = null;
        this.htmlChilds = null;
        this.addChildButton = null;
        this.collapseButton = null;

        this.createHtml();
        
        // Récupération et import du JSON si présent
        let json = document.getElementById('json').textContent;
        if (json && json.trim() !== "{}") {
            console.log('Importing from JSON');
            console.log(json);
            this.importFromJson(json);
        } else {
            console.log('No JSON to import');
            // création d'une matière et une note par défaut
            let UE1 = new UE(this.htmlChilds);
            let matiere1 = new Matiere(UE1.htmlChilds);
            matiere1.notes.push(new Note(matiere1.htmlChilds));
            UE1.matieres.push(matiere1);
            this.UEs.push(UE1);
            
        }
        
        this.setupListeners(); 
        
        this.updateAllLocked();
        this.updateAllMoyennesFromNotes();

    }

    createHtml() {
        let div = document.createElement('div');
        div.className = 'tree';
        div.setAttribute('role', 'tree');

        let buttonSave = document.createElement('button');
        buttonSave.setAttribute('id', 'save');
        buttonSave.textContent = '💾';
        div.appendChild(buttonSave);

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

        let input = document.createElement('input');
        input.type = 'number';
        input.value = '0';
        input.step = '0.1';
        input.setAttribute('aria-label', 'Note pour Programme');
        span2.appendChild(input);

        let ul2 = document.createElement('ul');
        ul2.setAttribute('role', 'group');
        li.appendChild(ul2);

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
        // Collapse/Expand global
        this.collapseButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.htmlChilds.classList.toggle('hidden');
            this.collapseButton.textContent = this.htmlChilds.classList.contains('hidden') ? '🔽' : '🔼';
        });

        // Ajout d'une UE
        this.addChildButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.UEs.push(new UE(this.htmlChilds));
        });

        document.body.addEventListener('change', (e) => {
            if (e.target.matches('.note-lock-input')) {
                this.updateAllLocked();
                this.updateAllLocked();
            }
        });

        document.body.addEventListener('input', (e) => {
            // Mise à jour de la moyenne générale à chaque modification de note
            if (e.target.matches('.note-note-input, .note-coef-input')) {
                // On lance plusieurs fois la mise à jour pour être sûr de recalculer
                this.updateAllMoyennesFromNotes();
                this.updateAllMoyennesFromNotes();
                this.updateAllMoyennesFromNotes();
            }
        });

        document.getElementById('save').addEventListener('click', (e) => {
            e.stopPropagation();
            console.log(this.exportToJson());
            fetch('/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: this.exportToJson()
            }).then(response => {
                if (response.ok) {
                    console.log(response);
                    window.location.href = response.url;
                } else {
                    console.error('Failed to save', response);
                }
            });
        });

    }

    updateHtmlFromAttributes() {
        this.moyenneInput.value = this.moyenne;
    }

    updateAllMoyennesFromNotes() {
        let sommeUEs = 0;
        let sommeCoeffsUE = 0;
        this.UEs.forEach((ue) => {
            let sommeMatieres = 0;
            let sommeCoeffsMat = 0;
            ue.matieres.forEach((matiere) => {
                let sommeNotes = 0;
                let sommeCoeffsNotes = 0;
                matiere.notes.forEach((note) => {
                    sommeNotes += note.note * note.coef;
                    sommeCoeffsNotes += note.coef;
                });
                matiere.moyenne = sommeNotes / sommeCoeffsNotes;
                matiere.updateHtmlFromAttributes();
                sommeMatieres += matiere.moyenne * matiere.coef;
                sommeCoeffsMat += matiere.coef;
            });
            ue.moyenne = sommeMatieres / sommeCoeffsMat;
            ue.updateHtmlFromAttributes();
            sommeUEs += ue.moyenne * ue.coef;
            sommeCoeffsUE += ue.coef;
        });
        this.moyenne = sommeUEs / sommeCoeffsUE;
        this.updateHtmlFromAttributes();
    }

    updateAllLocked() {
        this.UEs.forEach((ue) => {
            let ueLocked = ue.matieres.every((matiere) => matiere.notes.every((note) => note.locked));
            if (ueLocked) {
                ue.moyenneInput.disabled = true;
                ue.coefInput.disabled = true;
                ue.moyenneInput.parentElement.parentElement.style.backgroundColor = "rgba(0, 255, 64, 0.2)";
                // collapse l'UE
                ue.htmlChilds.classList.add('hidden');
                ue.collapseButton.textContent = '🔽';
            } else {
                ue.moyenneInput.parentElement.parentElement.style.backgroundColor = "transparent";
                ue.moyenneInput.disabled = false;
                ue.coefInput.disabled = false;
            }
            for (let matiere of ue.matieres) {
                let matiereLocked = matiere.notes.every((note) => note.locked);
                if (matiereLocked) {
                    matiere.moyenneInput.disabled = true;
                    matiere.coefInput.disabled = true;
                    matiere.moyenneInput.parentElement.parentElement.style.backgroundColor = "rgba(0, 255, 64, 0.2)";
                    // collapse la matière
                    matiere.htmlChilds.classList.add('hidden');
                    matiere.collapseButton.textContent = '🔽';
                } else {
                    matiere.moyenneInput.disabled = false;
                    matiere.coefInput.disabled = false;
                    matiere.moyenneInput.parentElement.parentElement.style.backgroundColor = "transparent";
                }
                for (let note of matiere.notes) {
                    if (note.locked) {
                        note.noteInput.disabled = true;
                        note.coefInput.disabled = true;
                        note.noteInput.parentElement.parentElement.style.backgroundColor = "rgba(0, 255, 64, 0.2)";
                    } else {
                        note.noteInput.disabled = false;
                        note.coefInput.disabled = false;
                        note.noteInput.parentElement.parentElement.style.backgroundColor = "transparent";
                    }
                }
            }
        }
        );
    }

    debug() {
        console.clear();
        console.log('DEBUG');
        for (let ue of this.UEs) {
            console.log('UE', ue.moyenne, ue.coef, ue.name);
            for (let matiere of ue.matieres) {
                console.log('  Matière', matiere.moyenne, matiere.coef, matiere.name);
                for (let note of matiere.notes) {
                    console.log('    Note', note.note, note.coef, note.locked);
                }
            }
        }
    }

    exportToJson() {
        let data = {
            moyenne: this.moyenne,
            UEs: []
        };

        for (let ue of this.UEs) {
            let ueData = {
                moyenne: ue.moyenne,
                coef: ue.coef,
                name: ue.name,
                matieres: []
            };

            for (let matiere of ue.matieres) {
                let matiereData = {
                    moyenne: matiere.moyenne,
                    coef: matiere.coef,
                    name: matiere.name,
                    notes: []
                };

                for (let note of matiere.notes) {
                    matiereData.notes.push({
                        note: note.note,
                        coef: note.coef,
                        locked: note.locked
                    });
                }
                ueData.matieres.push(matiereData);
            }
            data.UEs.push(ueData);
        }
        return JSON.stringify(data);
    }

    importFromJson(json) {
        try {
            // Décodage du JSON
            const data = JSON.parse(json);

            // Mise à jour de la moyenne globale
            this.moyenne = data.moyenne ?? 0;

            // Réinitialiser l'état global et vider l'affichage
            // Attention : ne pas vider complètement le conteneur global pour conserver le bouton d'ajout d'UE
            this.UEs = [];
            // Supprimez uniquement les UE existantes (les li qui contiennent les UE)
            // Ici, on ne vide pas this.htmlChilds (le conteneur global) s'il contient les boutons d'action
            // On peut aussi envisager de vider le conteneur et de le recréer ensuite
            while (this.htmlChilds.firstElementChild) {
                // On vérifie que l'élément n'est pas un bouton (qui possède la classe 'add-btn')
                if (!this.htmlChilds.firstElementChild.classList.contains('add-btn')) {
                    this.htmlChilds.removeChild(this.htmlChilds.firstElementChild);
                } else {
                    break;
                }
            }

            // Pour chaque UE présente dans le JSON
            for (const ueData of data.UEs) {
                // Créer une nouvelle UE
                const ue = new UE(this.htmlChilds);
                // Dans le conteneur de l'UE (la liste des matières), retirer les matières par défaut
                while (
                    ue.htmlChilds.firstElementChild &&
                    ue.htmlChilds.firstElementChild.classList.contains('folder')
                ) {
                    ue.htmlChilds.removeChild(ue.htmlChilds.firstElementChild);
                }
                ue.matieres = [];
                ue.name = ueData.name ?? 'UE';
                ue.moyenne = ueData.moyenne ?? 0;
                ue.coef = ueData.coef ?? 1;

                // Pour chaque matière de l'UE
                for (const matiereData of ueData.matieres) {
                    const matiere = new Matiere(ue.htmlChilds);
                    // Retirer la note par défaut dans le conteneur des notes de la matière
                    while (
                        matiere.htmlChilds.firstElementChild &&
                        matiere.htmlChilds.firstElementChild.classList.contains('file')
                    ) {
                        matiere.htmlChilds.removeChild(matiere.htmlChilds.firstElementChild);
                    }
                    matiere.notes = [];
                    matiere.name = matiereData.name ?? 'Matière';
                    matiere.moyenne = matiereData.moyenne ?? 0;
                    matiere.coef = matiereData.coef ?? 1;

                    // Pour chaque note de la matière
                    for (const noteData of matiereData.notes) {
                        const note = new Note(matiere.htmlChilds);
                        note.note = noteData.note ?? 0;
                        note.coef = noteData.coef ?? 1;
                        note.locked = noteData.locked ?? false;
                        // Ajout explicite de la note dans le tableau
                        matiere.notes.push(note);
                        note.updateHtmlFromAttributes();
                    }
                    ue.matieres.push(matiere);
                    matiere.updateHtmlFromAttributes();
                }
                this.UEs.push(ue);
                ue.updateHtmlFromAttributes();
            }
            // Recalculer les moyennes après l'import
            this.updateHtmlFromAttributes();
            this.updateAllMoyennesFromNotes();
        } catch (error) {
            console.error("Erreur lors de l'importation du JSON :", error);
        }
    }


}




// Dès que le DOM est chargé, on vide le body et on initialise le calculateur
document.addEventListener('DOMContentLoaded', () => {
    const global = new Global();
});



function sleep(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
}