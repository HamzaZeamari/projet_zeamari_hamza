import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../../../services/catalogue.service";

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  categorie!: string;
  filtre!: string;

  constructor(private catalogueService : CatalogueService ) { }

  ngOnInit(): void {
    this.categorie = "aucun";
    this.filtre  = "aucun"
  }

  recherche() : void {
    let filtre = {
      "categorie": this.categorie,
      "filtre": this.filtre
    };
    this.catalogueService.activerFiltre(filtre);
  }
}
