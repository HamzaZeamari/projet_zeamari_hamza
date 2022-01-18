import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ValidationService} from "../../../validation.service";


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  // Initialisation du formulaire d'inscription
  formulaireInscription!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Former le formulaire avec le formBuilder pour : nom, prenom, identifiant, mdp, mdp_validation et email
    // en validant si possible le mail et le mot de passe grâce aux différentes méthodes du service de validation
    this.formulaireInscription = this.formBuilder.group({
        prenom: ["", [Validators.required]],
        nom: ["", [Validators.required]],
        identifiant: ["", [Validators.required]],
        mdp: ["", [Validators.required]],
        mdp_validation: ["", [Validators.required]],
        email: ["", [Validators.required, ValidationService.validationEMail]],
  },
{validators : ValidationService.validationMDP})
}

  // Lors de la validation du formulaire, l'inscription sera faite
  // ou bien on pointera les éléments qui sont faux
  onSubmit() : void {
    if (this.formulaireInscription.valid) {
      console.log(this.formulaireInscription.value);
    }
    else {
      Object.keys(this.formulaireInscription.controls).forEach(field => {
        const control = this.formulaireInscription.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }




}
