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
  formulaireConnexion!: FormGroup;
  err!: string;


  constructor(private formBuilder: FormBuilder , private router: Router, private connexionService: ConnexionService) { }
  ngOnInit(): void {
    this.formulaireConnexion = this.formBuilder.group({
      login: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }
  onSubmit() : void {

    switch (this.formulaireConnexion.valid){
      case true:
        try{
          this.connexionService.connexion(this.login,this.password).subscribe(
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

  get login(){ return this.formulaireConnexion.get("login")?.value;}
  get password() { return this.formulaireConnexion.get("password")?.value;}


}
