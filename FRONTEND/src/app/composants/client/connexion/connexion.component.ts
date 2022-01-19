import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../../services/validation.service";
import {ConnexionService} from "../../../services/connexion.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  // Initialisation du formulaire de connexion
  formulaireConnexion!: FormGroup;
  err!: string;

  constructor(private formBuilder: FormBuilder , private router: Router, private connexionService: ConnexionService) { }

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
        try{
          this.connexionService.connexion(this.formulaireConnexion.get("identifiant")?.value, this.formulaireConnexion.get("mot_de_passe")?.value).subscribe(
            donnees => {
              this.router.navigate(["client/compte"]);
            }
        )}
        catch (e){
          // @ts-ignore
          this.err = e.value.toString();
          console.log(e);
        }

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
