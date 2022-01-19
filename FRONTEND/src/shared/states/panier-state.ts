import { AddP, DelAllP, DelP } from '../actions/panier-action';
import { Injectable } from '@angular/core';
import { Produit } from "../models/Produit";
import { Panier } from "../models/Panier";
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PanierStateModel } from './panier-state_model';




@State<PanierStateModel>({
  name: 'paniers',
  defaults: {
    paniers: [],
  },
})

@Injectable()
export class PanierState {
  @Selector()
  static getPaniersTaille(state: PanierStateModel) {
    return state.paniers.length;
  }

  @Selector()
  static getPaniers(state: PanierStateModel) {
    return state.paniers;
  }

  @Selector()
  static getPrixTotalPanier(state: PanierStateModel) {
    return state.paniers.reduce((acc, val: Panier) => acc + val.produit.prix * val.stock, 0);
  }

  estPresent(state: PanierStateModel, produit: Produit) : Panier {
    let panier! : Panier;
    state.paniers.forEach(
      (elem) => {
        switch(elem.produit.id){
          case produit.id:
            panier = elem;
            break;
        }
      }
    );
    return panier;
  }

  @Action(AddP)
  add(
    { getState, patchState }: StateContext<PanierStateModel>,
    { payload }: AddP
  ) {

    let panier = this.estPresent(getState(), payload);
    switch(panier){
      case null:
        let spPanier = new Panier(payload, 1);
        patchState({
          paniers: [...getState().paniers, spPanier]
        });
        break;
      default:
        panier.stock++;
        patchState({
          paniers: getState().paniers
        });
        break;
    }
  }

  @Action(DelP)
  del(
    { getState, patchState }: StateContext<PanierStateModel>,
    { payload }: DelP
  ) {
    let panier: Panier = this.estPresent(getState(), payload);
    switch (true){
      case panier != null && panier.stock == 1:
        patchState({
          paniers: getState().paniers.filter((panier) => panier.produit.id != payload.id)
        });
        break;
      case panier != null:
        panier.stock--;
        patchState({
          paniers: getState().paniers
        });
        break;
      default:
        patchState({
          paniers: getState().paniers
        });
        break;
    }
  }

  @Action(DelAllP)
  delAll(
    { getState, patchState }: StateContext<PanierStateModel>,
  ) {
    patchState({
      paniers: []
    })
  }
}
