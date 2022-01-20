import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static getMessageErrorConnexion(validation : string, valeurValid ?: any){
    const valid : any = {
      EMailError: "Email faux",
      mdpDifferent: "MDP faux",
      rempli : 'Remplir champs',
    };

    return valid[validation];
  }
  static validationEMail(controller: FormControl){
    const patternEmail : RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return controller.value.match(patternEmail) ? null : { incorrectEmail: true };
  }

  static validationMDP(controller: FormControl){
    let mdp = controller.get("password");
    let validation = controller.get("mdp_validation");

    switch (true){
      case mdp?.value !== validation?.value:
        mdp?.setErrors({ mdpDifferent: true });
        validation?.setErrors({ mdpDifferent: true });
        return { mdpDifferent: true };
        break;
      case mdp?.value.trim() === "" || validation?.value.trim() === "":
        return { rempli: true };
        break;
      default:
        mdp?.setErrors(null);
        validation?.setErrors(null);
        return null;
        break;

    }
  }
  constructor() { }
}
