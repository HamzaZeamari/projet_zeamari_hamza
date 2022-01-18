import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../../validation.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  // Initialisation du formulaire de connexion
  formulaireConnexion!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  // Lorsque la page se lance on appelle la création du formulaire
  ngOnInit(): void {
    this.formulaireConnexion = this.formBuilder.group({
      identifiant: ["", [Validators.required]],
      mot_de_passe: ["", [Validators.required]]
    });
  }

  // Lors de la validation du formulaire, la connexion sera faite
  // ou bien on pointera les éléments qui sont faux
  onSubmit() : void {
    switch (this.formulaireConnexion.valid){
      case true:
        console.log(this.formulaireConnexion.value);
        break;
      default :
        Object.keys(this.formulaireConnexion.controls).forEach(field => {
          const control = this.formulaireConnexion.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
        break;
    }
  }


}
