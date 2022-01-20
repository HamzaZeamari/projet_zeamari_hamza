import { Produit } from '../models/Produit';

export class AddP {
  static readonly type = '[Produit] AddP';
  constructor(public payload: Produit) {}
}
export class DelP {
  constructor(public payload: Produit) {}
  static readonly type = '[Produit] DelP';
}
export class DelAllP {
  constructor() {}
  static readonly type = '[Produit] DelAllP';
}
