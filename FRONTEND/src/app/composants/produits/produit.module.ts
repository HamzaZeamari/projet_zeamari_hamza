import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { CatalogueComponent } from './catalogue/catalogue.component';
import { RechercheComponent } from './recherche/recherche.component';
import { PanierComponent } from './panier/panier.component';
import { ElementDetailComponent } from './element-detail/element-detail.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PanierState} from "../../../shared/states/panier-state";
import {NgxsModule} from "@ngxs/store";


const app: Routes = [
  {
    path: 'catalogue',
    component: CatalogueComponent,
  },

  {
    path: 'produit/:id',
    component: ElementDetailComponent,
  },

  {
    path: 'panier',
    component: PanierComponent
  }
];

@NgModule({

  declarations: [
    CatalogueComponent,
    RechercheComponent,
    PanierComponent,
    ElementDetailComponent
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([PanierState]),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(app),

  ]
})

export class ProduitModule { }
