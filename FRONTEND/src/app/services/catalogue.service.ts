import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Produit} from "../../shared/models/Produit";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  subProduits!: Subject<Array<Produit>>;
  listeProduitsComplet!: Array<Produit>;
  listProduits!: Array<Produit>;

  constructor(private requete : HttpClient) { }

  // @ts-ignore
  public getSubProduits() : Subject<Array<Produit>> {
    if (this.subProduits == null) {
      this.subProduits = new Subject<Array<Produit>>();
      this.requete.get<Array<Produit>>("/api/produits").subscribe(
        (p) => {
          this.listeProduitsComplet = p;
          this.listProduits = p;
          if (this.listProduits != null) {
            this.subProduits.next(this.listProduits.slice());
          }
        }
      );
      return this.subProduits;
    }
  }

  // @ts-ignore
  public getProduits() : Array<Produit> {
    if (this.subProduits == null) {
      this.subProduits = new Subject<Array<Produit>>();
      this.requete.get<Array<Produit>>("/api/produits").subscribe(
        (p) => {
          this.listProduits = p;
          this.listeProduitsComplet = p;
          if (this.listProduits != null) {
            this.subProduits.next(this.listProduits.slice());
          }
        }
      );
      return this.listProduits;
    }
}
  public activerFiltre(d: any) : void {
    this.listProduits = this.listeProduitsComplet.slice();
    if (d["categorie"] !== "aucun") {
      this.listProduits = this.listProduits.filter((product) => product.categorie === d["categorie"]);
    }
    if (d["filtre"] != "aucun") {
      switch (d["filtre"]) {
        case "croissant":
          this.listProduits = this.listProduits.sort
          ((produit1, produit2) => produit1.prix - produit2.prix);
          break;
        case "decroissant":
          this.listProduits = this.listProduits.sort
          ((produit1, produit2) => produit2.prix - produit1.prix);
          break;
      }
    }
    if (this.listProduits != null) {
      this.subProduits.next(this.listProduits.slice());
    }
  }
}
