import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static getMessageErrorConnexion(validation : string, valeurValid ?: any){
    // On envoie dans le cas où une erreur sur le mdp ou le mail est détecté
    const valid : any = {
      EMailError: "Email faux",
      mdpDifferent: "MDP faux",
      rempli : 'Remplir champs',
    };

    return valid[validation];
  }
  static validationEMail(controller: FormControl){
    // On détermine si le mail entré dans le champ est définit comme le Regex patternEmail
    const patternEmail : RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return controller.value.match(patternEmail) ? null : { incorrectEmail: true };
  }

  static validationMDP(controller: FormControl){
    // On récupère le mot de passe et sa confirmation via le FormControl
    let mdp = controller.get("MDP");
    let validation = controller.get("validationMDP");

    switch (true){
      // On valide si le mdp est définit et identique à celle dans le champ de validation
      case mdp?.value !== validation?.value:
        mdp?.setErrors({ mdpDifferent: true });
        validation?.setErrors({ mdpDifferent: true });
        return { mdpDifferent: true };
        break;
      // On vérifie si les champs sont vides ou non
      case mdp?.value.trim() === "" || validation?.value.trim() === "":
        return { rempli: true };
        break;
      // Dans le cas où aucune erreur n'a été commise
      default:
        mdp?.setErrors(null);
        validation?.setErrors(null);
        return null;
        break;

    }
  }
  constructor() { }
}
