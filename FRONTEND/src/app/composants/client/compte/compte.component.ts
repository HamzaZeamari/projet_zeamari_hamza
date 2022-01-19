import { Component, OnInit } from '@angular/core';
import {ConnexionService} from "../../../services/connexion.service";
import {Utilisateur} from "../../../../shared/models/Utilisateur";

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  utilisateurConnecte!: Utilisateur;

  constructor(private connexionService: ConnexionService) {
    this.utilisateurConnecte = connexionService.getValue;
  }

  ngOnInit(): void {
  }

}
