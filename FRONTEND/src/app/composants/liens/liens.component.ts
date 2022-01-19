import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../../shared/models/Utilisateur";
import {ConnexionService} from "../../services/connexion.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-liens',
  templateUrl: './liens.component.html',
  styleUrls: ['./liens.component.css']
})
export class LiensComponent implements OnInit {
  utilisateurConnecte!: Utilisateur;

  constructor(private connexionService: ConnexionService, private router: Router) {
    connexionService.utilisateurConnecte.subscribe(
      (utilisateur) => this.utilisateurConnecte = utilisateur);
  }

  deconnexion() : void {
    this.connexionService.deconnexion();
    this.router.navigate(["/"]);
  }
  ngOnInit(): void {
  }

}
