import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LiensComponent } from './composants/liens/liens.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { NgxsModule } from "@ngxs/store";
import { PanierState } from "../shared/states/panier-state";
import { InterceptorsInterceptor } from './interceptors.interceptor';



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
    NgxsModule.forRoot([PanierState]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorsInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
