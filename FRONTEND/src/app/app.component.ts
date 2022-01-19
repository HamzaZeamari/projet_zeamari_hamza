import { Component } from '@angular/core';
import {Select} from "@ngxs/store";
import {PanierState} from "../shared/states/panier-state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONTEND';
  @Select(PanierState.getPaniersTaille) taillePanier!: Observable<number>;
}
