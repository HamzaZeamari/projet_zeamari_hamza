import {Component, Input, OnInit} from '@angular/core';
import {ValidationService} from "../../validation.service";

@Component({
  selector: 'app-gestion-mess',
  templateUrl: './gestion-mess.component.html',
  styleUrls: ['./gestion-mess.component.css']
})
export class GestionMessComponent implements OnInit {
  errorMessage: string = '';
  @Input() controller: any;
  constructor() { }

  ngOnInit(): void {
  }

  get messageErrors() {
    for (let propriete in this.controller?.errors) {
      if (this.controller?.errors.hasOwnProperty(propriete) && this.controller?.touched) {
        return ValidationService.getMessageErrorConnexion(propriete, this.controller?.errors[propriete]);
      }
    }
    return null;
  }
}
