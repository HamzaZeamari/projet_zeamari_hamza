import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {PanierState} from "../../../../shared/states/panier-state";
import {Observable, Subscription} from "rxjs";
import {Panier} from "../../../../shared/models/Panier";
import {AddP, DelAllP, DelP} from "../../../../shared/actions/panier-action";
import {Produit} from "../../../../shared/models/Produit";

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  @Select(PanierState.getPrixTotalPanier) prix!: Observable<number>;
  @Select(PanierState.getPaniers) paniers!: Observable<Array<Panier>>;
  @Select(PanierState.getPaniersTaille) taille!: number;

  ajout!: Subscription;
  total!: number;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.ajout = this.prix.subscribe(
      (total) => this.total = total
    );
  }

  ngOnDestroy(): void {
    this.ajout.unsubscribe();
  }

  ajouter(prod: Produit) {
      this.store.dispatch(new AddP(prod));
  }

  supprimer(prod: Produit) {
    this.store.dispatch(new DelP(prod));
  }

  transaction() {
      this.ajout.unsubscribe();
      this.store.dispatch(new DelAllP());
      console.log("Payé");
  }


}
