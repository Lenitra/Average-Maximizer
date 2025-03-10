

export class UV {
    constructor(name, coef) {
        this.name = name;
        this.coef = coef;
        this.matieres = [];
        this.moyenne = 0;
    }

    // Ajoute une matière dans l'UV
    addMatiere(matiere) {
        this.matieres.push(matiere);
        return this;
    }

    // Supprime la matière à l'indice donné
    deleteMatiere(matiereIndex) {
        this.matieres.splice(matiereIndex, 1);
        return this;
    }

    calculateMoyenne() {
        let total = 0, count = 0;
        this.matieres.forEach(matiere => {
            let m = matiere.calculateMoyenne();
            if (!isNaN(m)) {
                total += m;
                count++;
            }
        });
        this.moyenne = count ? parseFloat((total / count).toFixed(2)) : 0;
        return this.moyenne;
    }
}
