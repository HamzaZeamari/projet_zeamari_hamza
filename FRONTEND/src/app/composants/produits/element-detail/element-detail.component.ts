import { Component, OnInit } from '@angular/core';
import {Store} from "@ngxs/store";
import {CatalogueService} from "../../../services/catalogue.service";
import {ActivatedRoute} from "@angular/router";
import {Produit} from "../../../../shared/models/Produit";
import {AddP} from "../../../../shared/actions/panier-action";

@Component({
  selector: 'app-element-detail',
  templateUrl: './element-detail.component.html',
  styleUrls: ['./element-detail.component.css']
})
export class ElementDetailComponent implements OnInit {
  prod!: Produit;
  err!: string;

  constructor( private catalogueService: CatalogueService, private route : ActivatedRoute, private store : Store) {
    let temp = this.catalogueService.getProduits().filter((prod) => prod.id == this.route.snapshot.params['id']);
    if (temp.length > 0)
      this.prod = temp[0];
    else
      this.err = "Erreur! pas de produit avec cet id";
  }

  ngOnInit(): void {
  }

  ajouter(prod: Produit) {
    if(prod.stock > 0){
      this.store.dispatch(new AddP(prod));
    }
    else{
      console.log("Désolé ce produit n'est plus en stock");
    }
  }

}
