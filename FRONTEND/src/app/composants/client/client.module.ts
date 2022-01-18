import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";

import {ConnexionComponent} from "./connexion/connexion.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {CompteComponent} from "./compte/compte.component";
import {GestionMessComponent} from "../gestion-mess/gestion-mess.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const appChild: Routes = [
  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
  },
  {
    path: 'compte',
    component: CompteComponent,
  },
]

@NgModule({
  declarations: [
    CompteComponent,
    ConnexionComponent,
    InscriptionComponent,
    GestionMessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(appChild),
    ReactiveFormsModule
  ]
})
export class ClientModule { }
