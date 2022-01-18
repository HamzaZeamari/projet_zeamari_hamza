import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LiensComponent } from './composants/liens/liens.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

// Routes pour récupérer les clients et les produits
const routes : Routes = [
  {
      path :'produits',
      loadChildren: () => import('./composants/produits/produit.module').then((m) => m.ProduitModule),
  },
  {
      path: 'client',
      loadChildren: () => import('./composants/client/client.module').then((m) => m.ClientModule),
  },
]

@NgModule({
  declarations: [
    AppComponent,
    LiensComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
