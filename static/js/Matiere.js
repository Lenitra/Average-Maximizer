

export class Matiere {
    constructor(name, coef) {
        this.name = name;
        this.coef = coef;
        this.notes = [];
        this.moyenne = 0;
    }

    // Ajoute une note dans la matière
    addNote(note) {
        this.notes.push(note);
        return this;
    }

    // Supprime la note à l'indice donné
    deleteNote(noteIndex) {
        this.notes.splice(noteIndex, 1);
        return this;
    }


    calculateMoyenne() {
        let total = 0, totalCoef = 0;
        this.notes.forEach(note => {
            total += note.value * note.coef;
            totalCoef += note.coef;
        });
        this.moyenne = totalCoef ? parseFloat((total / totalCoef).toFixed(2)) : 0;
        return this.moyenne;
    }
}
