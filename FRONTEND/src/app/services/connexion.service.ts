import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Utilisateur} from "../../shared/models/Utilisateur";
import {InterceptorsInterceptor} from "../interceptors.interceptor";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {


  private utilSub!: BehaviorSubject<Utilisateur>;
  public utilisateurConnecte!: Observable<Utilisateur>;

  constructor(private requete : HttpClient) {
    let temp: Utilisateur = JSON.parse(localStorage.getItem('utilisateurConnecte')!);
    InterceptorsInterceptor.token = JSON.parse(localStorage.getItem('token')!);
    this.utilisateurConnecte = this.utilSub.asObservable();
  }

  public get getValue(): Utilisateur {
    return this.utilSub.value;
  }

  public deconnexion() {
    localStorage.removeItem('utilisateurConnecte');
    localStorage.removeItem('token');
    this.utilSub.next(null!);
  }

  public connexion(login: string, password: string) : Observable<Utilisateur>{
    let donneesConnexion: string = "login=" + login + "&password=" + password;
    let httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
    };
    return this.requete.post<Utilisateur>("/api/login", donneesConnexion, httpOptions).pipe(
      map((user) => {
        localStorage.setItem('token', JSON.stringify(InterceptorsInterceptor.token));
        localStorage.setItem('currentUser', JSON.stringify(user));

        this.utilSub.next(user);
        return user;
      })
    );
  }

  public inscription(email: string, password: string, prenom: string, nom: string, login: string) : Observable<Utilisateur> {
    let donneesInscription: string = "login=" + login + "&password=" + password + "&prenom=" + prenom + "&nom=" + nom + "&email=" + email;
    let httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
    };
    return this.requete.post<Utilisateur>("/api/signin", donneesInscription, httpOptions);
  }
}
