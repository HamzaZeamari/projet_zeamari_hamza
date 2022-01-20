import { Produit } from '../models/Produit';

// Ajout d'un produit
export class AddP {
  static readonly type = '[Produit] AddP';
  constructor(public payload: Produit) {}
}
// Suppression d'un produit
export class DelP {
  constructor(public payload: Produit) {}
  static readonly type = '[Produit] DelP';
}
// Suppression de tous les produits
export class DelAllP {
  constructor() {}
  static readonly type = '[Produit] DelAllP';
}
