import { Component, OnInit, OnDestroy } from '@angular/core';
import {Store} from "@ngxs/store";
import {CatalogueService} from "../../../services/catalogue.service";
import {Produit} from "../../../../shared/models/Produit";
import {Subscription} from "rxjs";
import {AddP} from "../../../../shared/actions/panier-action";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit, OnDestroy{

  produits!:  Array<Produit>;
  ajouts!: Subscription;

  constructor(private catalogueService: CatalogueService, private store: Store) { }

  ngOnInit(): void {
    this.produits = this.catalogueService.getProduits();
      this.ajouts = this.catalogueService.getSubProduits().subscribe((prod) => this.produits = prod);
  }
  ngOnDestroy(): void{
    this.ajouts.unsubscribe();
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
