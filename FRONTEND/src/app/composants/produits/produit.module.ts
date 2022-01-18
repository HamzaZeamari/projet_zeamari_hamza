import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { CatalogueComponent } from './catalogue/catalogue.component';
import { RechercheComponent } from './recherche/recherche.component';
import { PanierComponent } from './panier/panier.component';
import { ElementDetailComponent } from './element-detail/element-detail.component';

@NgModule({

  declarations: [
    CatalogueComponent,
    RechercheComponent,
    PanierComponent,
    ElementDetailComponent
  ],
  imports: [
    CommonModule
  ]
})

export class ProduitModule { }
