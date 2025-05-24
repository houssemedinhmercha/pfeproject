// ajouter-contrat.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratService } from '../services/contrat.service';

@Component({
  selector: 'app-ajouter-contrat',
  templateUrl: './ajouter-contrat.component.html',
  styleUrls: ['./ajouter-contrat.component.css']
})
export class AjouterContratComponent implements OnInit {
  contratForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private contratService: ContratService) {}

  ngOnInit(): void {
    this.contratForm = this.fb.group({
      objet: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]],
      direction: [''],
      dateSignature: [''],
      dateEffet: [''],
      duree: [''],
      dateFin: [''],
      datePreavis: [''],
      numProjet: ['', Validators.required],   // Numéro projet (string)
      nomPorteur: ['', Validators.required],
      prenomPorteur: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contratForm.invalid) {
      this.message = "Merci de remplir tous les champs obligatoires.";
      return;
    }

    const formValue = this.contratForm.value;

    const data = {
      objet: formValue.objet,
      montant: formValue.montant,
      direction: formValue.direction,
      dateSignature: formValue.dateSignature,
      dateEffet: formValue.dateEffet,
      duree: formValue.duree,
      dateFin: formValue.dateFin,
      datePreavis: formValue.datePreavis,
      projet: [formValue.numProjet],  // Tableau avec numéro de projet (string)
      etat: 'en attente',
      nomPorteur: formValue.nomPorteur,
      prenomPorteur: formValue.prenomPorteur
    };

    this.contratService.createContrat(data).subscribe({
      next: (res) => {
        this.message = "Contrat créé avec succès !";
        this.contratForm.reset();
      },
      error: (err) => {
        this.message = err.error.message || "Erreur lors de la création du contrat.";
      }
    });
  }
}
