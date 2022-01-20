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

  produits:  Array<Produit> = new Array<Produit>();
  ajouts: Subscription = new Subscription();

  constructor(private catalogueService: CatalogueService, private store: Store) { }

  ngOnInit(): void {
    console.log(this.catalogueService.getProduits());
    console.log(this.catalogueService.getSubProduits());
    this.produits = this.catalogueService.getProduits();
      this.ajouts = this.catalogueService.getSubProduits().subscribe((prod) => this.produits = prod);
  }
  ngOnDestroy(): void{
    this.ajouts.unsubscribe();
  }

  ajouter(prod: Produit) {
    console.log(prod);
      this.store.dispatch(new AddP(prod));
  }
}
