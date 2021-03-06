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
  formulaireInscription: FormGroup = new FormGroup({});
  err: string = "";

  constructor(private formBuilder: FormBuilder, private router: Router, private connexionService: ConnexionService) { }

  ngOnInit(): void {
     this.formulaireInscription = this.formBuilder.group({
        prenom: ["", [Validators.required]],
        nom: ["", [Validators.required]],
        login: ["", [Validators.required]],
        password: ["", [Validators.required]],
        mdp_validation: ["", [Validators.required]],
        email: ["", [Validators.required, ValidationService.validationEMail]]
  },
{validators : ValidationService.validationMDP});

}


   onSubmit() : void {
    switch (this.formulaireInscription.valid){
      case true:
        try{
          this.connexionService.inscription(this.email,this.password,this.prenom,this.nom,this.login).subscribe(
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


  get login() { return this.formulaireInscription.get("login")?.value; }
  get password() { return this.formulaireInscription.get("password")?.value; }
  get mdp_validation() { return this.formulaireInscription.get("mdp_validation")?.value; }
  get email() { return this.formulaireInscription.get("email")?.value; }
  get prenom() { return this.formulaireInscription.get("prenom")?.value; }
  get nom() { return this.formulaireInscription.get("nom")?.value; }




}
