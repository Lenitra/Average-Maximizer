import { Note } from "./Note.js";
import { Matiere } from "./Matiere.js";
import { UV } from "./UV.js";

export class App {
  constructor(container) {
    this.container = container;
    this.uvs = [];

    // Données par défaut
    let uv1;
    let m1;

    uv1 = new UV("UV 1", 5);

    m1 = new Matiere("Base  sur les résaux", 2);
    m1.addNote(new Note(17, 1, true));
    uv1.addMatiere(m1);

    m1 = new Matiere("Système d'exploitation win7", 2);
    m1.addNote(new Note(13.174, 1, true));
    uv1.addMatiere(m1);

    m1 = new Matiere("Système d'exploitation Linux ", 2);
    m1.addNote(new Note(16.08, 1, true));
    uv1.addMatiere(m1);

    m1 = new Matiere("HTML/CSS ", 4);
    m1.addNote(new Note(19.5, 1, true));
    uv1.addMatiere(m1);

    this.uvs.push(uv1);




    uv1 = new UV("UV 2", 11);

    m1 = new Matiere("Sécurité des SI / Cyber", 1);
    m1.addNote(new Note(16.67, 1, true));
    uv1.addMatiere(m1);

    m1 = new Matiere("Algorithmique", 2);
    m1.addNote(new Note(19.25, 1, true));
    uv1.addMatiere(m1);

    m1 = new Matiere("COO", 2);
    m1.addNote(new Note(12, 1, false));
    uv1.addMatiere(m1);

    m1 = new Matiere("JavaBase ", 4);
    m1.addNote(new Note(15, 1, false));
    m1.addNote(new Note(15, 1, false));
    uv1.addMatiere(m1);

    m1 = new Matiere("JS", 2);
    m1.addNote(new Note(20, 1, true));
    uv1.addMatiere(m1);

    m1 = new Matiere("XML", 2);
    m1.addNote(new Note(15, 1, false));
    uv1.addMatiere(m1);

    m1 = new Matiere("BDD", 2);
    m1.addNote(new Note(14.252, 1, true));
    uv1.addMatiere(m1);

    this.uvs.push(uv1);




    uv1 = new UV("UV 3", 14);

    m1 = new Matiere("SQL", 3);
    m1.addNote(new Note(15, 1, false));
    m1.addNote(new Note(15, 2, false));
    uv1.addMatiere(m1);

    uv1.addMatiere(m1);
    m1 = new Matiere("Java Avancé", 4);
    m1.addNote(new Note(15, 1, false));
    uv1.addMatiere(m1);

    m1 = new Matiere("JEE", 5);
    m1.addNote(new Note(15, 1, false));
    uv1.addMatiere(m1);

    m1 = new Matiere("Sécurité applicative", 2);
    m1.addNote(new Note(15, 1, false));
    uv1.addMatiere(m1);

    this.uvs.push(uv1);



    uv1 = new UV("UV 4", 8);

    // ANASI	2
    // Archi Sys	2
    // Gestion projet	2
    // Projet cursurs	2

    m1 = new Matiere("ANASI", 2);
    m1.addNote(new Note(15, 1, false));
    uv1.addMatiere(m1);

    m1 = new Matiere("Archi Sys", 2);
    m1.addNote(new Note(15, 1, false));
    uv1.addMatiere(m1);

    m1 = new Matiere("Gestion projet", 2);
    m1.addNote(new Note(15, 1, false));
    uv1.addMatiere(m1);

    m1 = new Matiere("Projet cursurs", 2);
    m1.addNote(new Note(15, 1, false));
    uv1.addMatiere(m1);

    this.uvs.push(uv1);


    this.init();
  }

  init() {
    // Bouton global "Ajouter UV" (situé dans index.html)
    document.querySelector("button.btn-primary").addEventListener("click", () => {
      this.handleAddUV();
    });

    // Event delegation pour les clics
    this.container.addEventListener("click", (e) => {
      if (e.target.matches(".uv-delete")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        this.uvs.splice(uvIndex, 1);
        this.render();
      } else if (e.target.matches(".matiere-delete")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        const matiereIndex = parseInt(e.target.dataset.matiereIndex);
        this.uvs[uvIndex].deleteMatiere(matiereIndex);
        this.render();
      } else if (e.target.matches(".note-delete")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        const matiereIndex = parseInt(e.target.dataset.matiereIndex);
        const noteIndex = parseInt(e.target.dataset.noteIndex);
        this.uvs[uvIndex].matieres[matiereIndex].deleteNote(noteIndex);
        this.render();
      } else if (e.target.matches(".add-matiere")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        this.handleAddMatiere(uvIndex);
      } else if (e.target.matches(".add-note")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        const matiereIndex = parseInt(e.target.dataset.matiereIndex);
        this.handleAddNote(uvIndex, matiereIndex);
      }
    });

    // Event delegation pour les changements sur les inputs
    this.container.addEventListener("change", (e) => {
      // UV modifications
      if (e.target.matches(".uv-name")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        this.uvs[uvIndex].name = e.target.value;
      } else if (e.target.matches(".uv-coef")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        this.uvs[uvIndex].coef = parseFloat(e.target.value) || 0;
      }
      // Matière modifications
      else if (e.target.matches(".matiere-name")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        const matiereIndex = parseInt(e.target.dataset.matiereIndex);
        this.uvs[uvIndex].matieres[matiereIndex].name = e.target.value;
      } else if (e.target.matches(".matiere-coef")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        const matiereIndex = parseInt(e.target.dataset.matiereIndex);
        this.uvs[uvIndex].matieres[matiereIndex].coef = parseFloat(e.target.value) || 0;
      }
      // Note modifications
      else if (e.target.matches(".note-value")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        const matiereIndex = parseInt(e.target.dataset.matiereIndex);
        const noteIndex = parseInt(e.target.dataset.noteIndex);
        this.uvs[uvIndex].matieres[matiereIndex].notes[noteIndex].value = parseFloat(e.target.value) || 0;
      } else if (e.target.matches(".note-coef")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        const matiereIndex = parseInt(e.target.dataset.matiereIndex);
        const noteIndex = parseInt(e.target.dataset.noteIndex);
        this.uvs[uvIndex].matieres[matiereIndex].notes[noteIndex].coef = parseFloat(e.target.value) || 0;
      }
      // Lorsqu'on modifie la moyenne d'une Matière, on ajuste les notes non verrouillées.
      else if (e.target.matches(".matiere-moyenne")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        const matiereIndex = parseInt(e.target.dataset.matiereIndex);
        const targetAvg = parseFloat(e.target.value) || 0;
        let matiere = this.uvs[uvIndex].matieres[matiereIndex];

        let lockedSum = 0, lockedCoef = 0, nonLockedCoef = 0;
        matiere.notes.forEach(note => {
          if (note.locked) {
            lockedSum += note.value * note.coef;
            lockedCoef += note.coef;
          } else {
            nonLockedCoef += note.coef;
          }
        });
        if (nonLockedCoef > 0) {
          const totalCoef = lockedCoef + nonLockedCoef;
          const requiredTotalSum = targetAvg * totalCoef;
          const requiredNonLockedSum = requiredTotalSum - lockedSum;
          matiere.notes.forEach(note => {
            if (!note.locked) {
              note.value = parseFloat((requiredNonLockedSum * (note.coef / nonLockedCoef)).toFixed(2));
            }
          });
        }
        matiere.calculateMoyenne();
      }
      // Modification de la moyenne d'une UV (editable directement)
      else if (e.target.matches(".uv-moyenne")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        this.uvs[uvIndex].moyenne = parseFloat(e.target.value) || 0;
      }
    });

    // Gestion du changement sur les cases à cocher pour le statut "locked" des notes
    this.container.addEventListener("change", (e) => {
      if (e.target.matches(".note-locked")) {
        const uvIndex = parseInt(e.target.dataset.uvIndex);
        const matiereIndex = parseInt(e.target.dataset.matiereIndex);
        const noteIndex = parseInt(e.target.dataset.noteIndex);
        this.uvs[uvIndex].matieres[matiereIndex].notes[noteIndex].locked = e.target.checked;
      }
      this.render();
    });

    this.render();
  }

  handleAddUV() {
    const uvName = prompt("Nom de l'UV :") || "Nouvelle UV";
    const coef = parseFloat(prompt("Coef UV :")) || 1;
    const newUV = new UV(uvName, coef);
    // Ajout d'une matière par défaut via la méthode de UV
    newUV.addMatiere(new Matiere("Nouvelle Matière", 1));
    this.uvs.push(newUV);
    this.render();
  }

  handleAddMatiere(uvIndex) {
    this.uvs[uvIndex].addMatiere(new Matiere("Nouvelle matière", 1));
    this.render();
  }

  handleAddNote(uvIndex, matiereIndex) {
    const value = parseFloat(prompt("Valeur de la note :")) || 0;
    const coef = parseFloat(prompt("Coef de la note :")) || 1;
    const locked = confirm("Note verrouillée ?");
    this.uvs[uvIndex].matieres[matiereIndex].addNote(new Note(value, coef, locked));
    this.render();
  }

  render() {
    // Recalculer les moyennes pour chaque matière et UV
    this.uvs.forEach(uv => {
      uv.calculateMoyenne();
      uv.matieres.forEach(matiere => {
        matiere.calculateMoyenne();
      });
    });

    let html = "";
    this.uvs.forEach((uv, uvIndex) => {
      html += `
      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-2">
            <span>📘</span>
            <input type="text" class="form-control form-control-sm uv-name" data-uv-index="${uvIndex}" value="${uv.name}">
            <span class="ms-2">Coef UV:</span>
            <input type="number" class="form-control form-control-sm uv-coef" data-uv-index="${uvIndex}" style="width:80px;" value="${uv.coef}">
          </div>
          <button class="btn btn-danger btn-sm uv-delete" data-uv-index="${uvIndex}">Supprimer UV</button>
        </div>
        <div class="card-body">
      `;

      uv.matieres.forEach((matiere, matiereIndex) => {
        html += `
          <div class="card mb-3">
            <div class="card-header d-flex justify-content-between align-items-center bg-secondary text-white">
              <div class="d-flex align-items-center gap-2">
                <span>📚</span>
                <input type="text" class="form-control form-control-sm matiere-name" data-uv-index="${uvIndex}" data-matiere-index="${matiereIndex}" value="${matiere.name}">
                <span class="ms-2">Coef Matière:</span>
                <input type="number" class="form-control form-control-sm matiere-coef" data-uv-index="${uvIndex}" data-matiere-index="${matiereIndex}" style="width:80px;" value="${matiere.coef}">
              </div>
              <button class="btn btn-danger btn-sm matiere-delete" data-uv-index="${uvIndex}" data-matiere-index="${matiereIndex}">Supprimer Matière</button>
            </div>
            <div class="card-body">
              <table class="table table-sm align-middle">
                <thead>
                  <tr class="table-light">
                    <th>Note</th>
                    <th>Coef Note</th>
                    <th>Verrouillé</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
        `;
        matiere.notes.forEach((note, noteIndex) => {
          html += `
                  <tr>
                    <td>
                      <input type="number" step="0.1" class="form-control form-control-sm note-value" data-uv-index="${uvIndex}" data-matiere-index="${matiereIndex}" data-note-index="${noteIndex}" value="${note.value}">
                    </td>
                    <td>
                      <input type="number" class="form-control form-control-sm note-coef" data-uv-index="${uvIndex}" data-matiere-index="${matiereIndex}" data-note-index="${noteIndex}" value="${note.coef}">
                    </td>
                    <td>
                      <input type="checkbox" class="note-locked" data-uv-index="${uvIndex}" data-matiere-index="${matiereIndex}" data-note-index="${noteIndex}" ${note.locked ? "checked" : ""}>
                    </td>
                    <td>
                      <button class="btn btn-sm btn-outline-danger note-delete" data-uv-index="${uvIndex}" data-matiere-index="${matiereIndex}" data-note-index="${noteIndex}">✖️</button>
                    </td>
                  </tr>
          `;
        });
        html += `
                </tbody>
              </table>
              <button class="btn btn-success btn-sm add-note" data-uv-index="${uvIndex}" data-matiere-index="${matiereIndex}">+ Ajouter Note</button>
              <div class="mt-3">
                <label class="form-label">Moyenne Matière :</label>
                <input type="number" step="0.1" class="form-control form-control-sm matiere-moyenne" data-uv-index="${uvIndex}" data-matiere-index="${matiereIndex}" value="${matiere.moyenne}">
              </div>
            </div>
          </div>
        `;
      });
      html += `
              <button class="btn btn-success btn-sm add-matiere" data-uv-index="${uvIndex}">+ Ajouter Matière</button>
        </div>
        <div class="card-footer bg-white d-flex justify-content-end align-items-center gap-2">
          <strong>Moyenne UV :</strong>
          <input type="number" step="0.1" class="form-control form-control-sm uv-moyenne" data-uv-index="${uvIndex}" value="${uv.moyenne}">
        </div>
      </div>
      `;
    });
    this.container.innerHTML = html;
  }
}
