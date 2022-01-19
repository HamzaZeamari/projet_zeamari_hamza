import { Produit } from '../models/Produit';

// Ajout d'un produit
export class AddP {
  static readonly type = '[Produit] Add';
  constructor(public payload: Produit) {}
}
// Suppression d'un produit
export class DelP {
  constructor(public payload: Produit) {}
  static readonly type = '[Produit] Del';
}
// Suppression de tous les produits
export class DelAllP {
  constructor() {}
  static readonly type = '[Produit] DelAll';
}
