import { Produit } from "./Produit";


export class Panier {
  constructor(public produit: Produit, public stock: number) { }
}
