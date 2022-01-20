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
    const state = getState();
    let panier = this.estPresent(state, payload);

    if (panier != null) {
      panier.stock++;
      patchState({
        paniers: state.paniers
      });
    }
    else {
      let panier = new Panier(payload, 1);
      patchState({
        paniers: [...state.paniers, panier]
      });
    }
  }

  @Action(DelP)
  del(
    { getState, patchState }: StateContext<PanierStateModel>,
    { payload }: DelP
  ) {
    const state = getState();
    let pan: Panier = this.estPresent(state, payload);

    if (pan != null && pan.stock == 1) {
      patchState({
        paniers: state.paniers.filter((p) => pan.produit.id != payload.id)
      });
    }
    else if (pan != null) {
      pan.stock--;
      patchState({
        paniers: state.paniers
      });
    }
    else {
      patchState({
        paniers: state.paniers
      });
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
