import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ValidationService} from "../../../services/validation.service";
import {Router} from "@angular/router";
import {ConnexionService} from "../../../services/connexion.service";


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  // Initialisation du formulaire d'inscription
  formulaireInscription!: FormGroup;
  err: string = "";


  constructor(private formBuilder: FormBuilder, private router: Router, private connexionService: ConnexionService) { }

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
    switch (this.formulaireInscription.valid){
      case true:
        try{
          this.connexionService.inscription(this.formulaireInscription.get("email")?.value,this.formulaireInscription.get("mdp")?.value,
                                            this.formulaireInscription.get("prenom")?.value,this.formulaireInscription.get("nom")?.value,
                                            this.formulaireInscription.get("identifiant")?.value).subscribe(
            donnees => {
              this.router.navigate(["client/connexion"]);
            }
          )}
        catch (e){
          // @ts-ignore
          this.err = e.value.toString();
          console.log(e);
        }

        break;
      default :
        Object.keys(this.formulaireInscription.controls).forEach(field => {
          const control = this.formulaireInscription.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
        break;
    }
  }




}
