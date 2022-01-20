"use strict";(self.webpackChunkFRONTEND=self.webpackChunkFRONTEND||[]).push([[737],{2737:(_,v,s)=>{s.r(v),s.d(v,{ClientModule:()=>T});var a=s(9808),u=s(3560),t=s(3075),o=s(7587),m=s(5132);let p=(()=>{class i{constructor(){}static getMessageErrorConnexion(e,n){return{EMailError:"Email faux",mdpDifferent:"MDP faux",rempli:"Remplir champs"}[e]}static validationEMail(e){return e.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)?null:{incorrectEmail:!0}}static validationMDP(e){let n=e.get("password"),r=e.get("mdp_validation");switch(!0){case(null==n?void 0:n.value)!==(null==r?void 0:r.value):return null==n||n.setErrors({mdpDifferent:!0}),null==r||r.setErrors({mdpDifferent:!0}),{mdpDifferent:!0};case""===(null==n?void 0:n.value.trim())||""===(null==r?void 0:r.value.trim()):return{rempli:!0};default:return null==n||n.setErrors(null),null==r||r.setErrors(null),null}}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275prov=o.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})(),g=(()=>{class i{constructor(){this.errorMessage=""}ngOnInit(){}get messageErrors(){var e,n,r,d;for(let c in null===(e=this.controller)||void 0===e?void 0:e.errors)if((null===(n=this.controller)||void 0===n?void 0:n.errors.hasOwnProperty(c))&&(null===(r=this.controller)||void 0===r?void 0:r.touched))return p.getMessageErrorConnexion(c,null===(d=this.controller)||void 0===d?void 0:d.errors[c]);return null}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=o.Xpm({type:i,selectors:[["app-gestion-mess"]],inputs:{controller:"controller"},decls:2,vars:1,template:function(e,n){1&e&&(o.TgZ(0,"p"),o._uU(1),o.qZA()),2&e&&(o.xp6(1),o.Oqu(n.errorMessage))},styles:[""]}),i})();function f(i,l){if(1&i&&(o.TgZ(0,"div"),o.TgZ(1,"p"),o._uU(2),o.qZA(),o.qZA()),2&i){const e=o.oxw();o.xp6(2),o.Oqu(e.err)}}let Z=(()=>{class i{constructor(e,n,r){this.formBuilder=e,this.router=n,this.connexionService=r}ngOnInit(){this.formulaireConnexion=this.formBuilder.group({login:["",[t.kI.required]],password:["",[t.kI.required]]})}onSubmit(){if(!0===this.formulaireConnexion.valid)try{this.connexionService.connexion(this.login,this.password).subscribe(e=>{this.router.navigate(["client/compte"])})}catch(e){this.err=e.value.toString(),console.log(e)}else Object.keys(this.formulaireConnexion.controls).forEach(e=>{const n=this.formulaireConnexion.get(e);null==n||n.markAsTouched({onlySelf:!0})})}get login(){var e;return null===(e=this.formulaireConnexion.get("login"))||void 0===e?void 0:e.value}get password(){var e;return null===(e=this.formulaireConnexion.get("password"))||void 0===e?void 0:e.value}}return i.\u0275fac=function(e){return new(e||i)(o.Y36(t.qu),o.Y36(u.F0),o.Y36(m.O))},i.\u0275cmp=o.Xpm({type:i,selectors:[["app-connexion"]],decls:20,vars:4,consts:[[3,"formGroup","ngSubmit"],["for","login"],["type","text","name","login","id","login","formControlName","login"],[3,"controller"],["for","password"],["type","password","name","password","id","password","formControlName","password"],[4,"ngIf"],["type","submit"]],template:function(e,n){1&e&&(o.TgZ(0,"div"),o.TgZ(1,"form",0),o.NdJ("ngSubmit",function(){return n.onSubmit()}),o.TgZ(2,"div"),o.TgZ(3,"label",1),o._uU(4,"Identifiant"),o.qZA(),o._UZ(5,"input",2),o.TgZ(6,"div"),o._UZ(7,"app-gestion-mess",3),o.qZA(),o.qZA(),o.TgZ(8,"div"),o.TgZ(9,"label",4),o._uU(10,"Mot de Passe"),o.qZA(),o._UZ(11,"input",5),o.TgZ(12,"div"),o._UZ(13,"app-gestion-mess",3),o.qZA(),o.qZA(),o.TgZ(14,"div"),o.TgZ(15,"div"),o.TgZ(16,"div"),o.YNc(17,f,3,1,"div",6),o.TgZ(18,"button",7),o._uU(19,"Se connecter"),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&e&&(o.xp6(1),o.Q6J("formGroup",n.formulaireConnexion),o.xp6(6),o.Q6J("controller",n.login),o.xp6(6),o.Q6J("controller",n.password),o.xp6(4),o.Q6J("ngIf",n.err))},directives:[t._Y,t.JL,t.sg,t.Fj,t.JJ,t.u,g,a.O5],styles:[""]}),i})();function h(i,l){if(1&i&&(o.TgZ(0,"div"),o.TgZ(1,"p"),o._uU(2),o.qZA(),o.qZA()),2&i){const e=o.oxw();o.xp6(2),o.Oqu(e.err)}}const C=[{path:"inscription",component:(()=>{class i{constructor(e,n,r){this.formBuilder=e,this.router=n,this.connexionService=r,this.formulaireInscription=new t.cw({}),this.err=""}ngOnInit(){this.formulaireInscription=this.formBuilder.group({prenom:["",[t.kI.required]],nom:["",[t.kI.required]],login:["",[t.kI.required]],password:["",[t.kI.required]],mdp_validation:["",[t.kI.required]],email:["",[t.kI.required,p.validationEMail]]},{validators:p.validationMDP})}onSubmit(){if(!0===this.formulaireInscription.valid)try{this.connexionService.inscription(this.email,this.password,this.prenom,this.nom,this.login).subscribe(e=>{this.router.navigate(["client/connexion"])})}catch(e){this.err=e.value.toString(),console.log(e)}else Object.keys(this.formulaireInscription.controls).forEach(e=>{const n=this.formulaireInscription.get(e);null==n||n.markAsTouched({onlySelf:!0})})}get login(){var e;return null===(e=this.formulaireInscription.get("login"))||void 0===e?void 0:e.value}get password(){var e;return null===(e=this.formulaireInscription.get("password"))||void 0===e?void 0:e.value}get mdp_validation(){var e;return null===(e=this.formulaireInscription.get("mdp_validation"))||void 0===e?void 0:e.value}get email(){var e;return null===(e=this.formulaireInscription.get("email"))||void 0===e?void 0:e.value}get prenom(){var e;return null===(e=this.formulaireInscription.get("prenom"))||void 0===e?void 0:e.value}get nom(){var e;return null===(e=this.formulaireInscription.get("nom"))||void 0===e?void 0:e.value}}return i.\u0275fac=function(e){return new(e||i)(o.Y36(t.qu),o.Y36(u.F0),o.Y36(m.O))},i.\u0275cmp=o.Xpm({type:i,selectors:[["app-inscription"]],decls:44,vars:8,consts:[["id","form","novalidate","",1,"mt-5",3,"formGroup","ngSubmit"],["for","nom",1,"form-label"],["type","text","name","nom","id","nom","formControlName","nom",1,"form-control"],[3,"controller"],["for","prenom",1,"form-label"],["type","text","name","prenom","id","prenom","formControlName","prenom",1,"form-control"],["for","email",1,"form-label"],["type","email","name","email","id","email","formControlName","email",1,"form-control"],["for","login",1,"form-label"],["type","text","name","login","id","login","formControlName","login",1,"form-control"],["for","password",1,"form-label"],["type","password","name","password","id","password","formControlName","password",1,"form-control"],["type","password","name","mdp_validation","id","mdp_validation","formControlName","mdp_validation",1,"form-control"],[4,"ngIf"],["type","submit"]],template:function(e,n){1&e&&(o.TgZ(0,"form",0),o.NdJ("ngSubmit",function(){return n.onSubmit()}),o.TgZ(1,"div"),o.TgZ(2,"div"),o.TgZ(3,"label",1),o._uU(4,"Nom"),o.qZA(),o._UZ(5,"input",2),o.TgZ(6,"div"),o._UZ(7,"app-gestion-mess",3),o.qZA(),o.qZA(),o.TgZ(8,"div"),o.TgZ(9,"label",4),o._uU(10,"Pr\xe9nom"),o.qZA(),o._UZ(11,"input",5),o.TgZ(12,"div"),o._UZ(13,"app-gestion-mess",3),o.qZA(),o.qZA(),o.qZA(),o.TgZ(14,"div"),o.TgZ(15,"label",6),o._uU(16,"Email"),o.qZA(),o._UZ(17,"input",7),o.TgZ(18,"div"),o._UZ(19,"app-gestion-mess",3),o.qZA(),o.qZA(),o.TgZ(20,"div"),o.TgZ(21,"label",8),o._uU(22,"Login"),o.qZA(),o._UZ(23,"input",9),o.TgZ(24,"div"),o._UZ(25,"app-gestion-mess",3),o.qZA(),o.qZA(),o.TgZ(26,"div"),o.TgZ(27,"div"),o.TgZ(28,"label",10),o._uU(29,"Mot de passe"),o.qZA(),o._UZ(30,"input",11),o.TgZ(31,"div"),o._UZ(32,"app-gestion-mess",3),o.qZA(),o.qZA(),o.TgZ(33,"div"),o.TgZ(34,"label",10),o._uU(35,"Confirmer le mot de passe"),o.qZA(),o._UZ(36,"input",12),o.TgZ(37,"div"),o._UZ(38,"app-gestion-mess",3),o.qZA(),o.qZA(),o.qZA(),o.TgZ(39,"div"),o.YNc(40,h,3,1,"div",13),o.TgZ(41,"div"),o.TgZ(42,"button",14),o._uU(43,"S'inscrire"),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&e&&(o.Q6J("formGroup",n.formulaireInscription),o.xp6(7),o.Q6J("controller",n.nom),o.xp6(6),o.Q6J("controller",n.prenom),o.xp6(6),o.Q6J("controller",n.email),o.xp6(6),o.Q6J("controller",n.login),o.xp6(7),o.Q6J("controller",n.password),o.xp6(6),o.Q6J("controller",n.mdp_validation),o.xp6(2),o.Q6J("ngIf",n.err))},directives:[t._Y,t.JL,t.sg,t.Fj,t.JJ,t.u,g,a.O5],styles:[""]}),i})()},{path:"connexion",component:Z},{path:"compte",component:(()=>{class i{constructor(e){this.connexionService=e,this.utilisateurConnecte=e.getValue}ngOnInit(){}}return i.\u0275fac=function(e){return new(e||i)(o.Y36(m.O))},i.\u0275cmp=o.Xpm({type:i,selectors:[["app-compte"]],decls:3,vars:4,template:function(e,n){1&e&&(o.TgZ(0,"div"),o.TgZ(1,"p"),o._uU(2),o.qZA(),o.qZA()),2&e&&(o.xp6(2),o.HOy(" Identifiant : ",n.utilisateurConnecte.login," Nom : ",n.utilisateurConnecte.prenom," Prenom : ",n.utilisateurConnecte.nom," E-Mail : ",n.utilisateurConnecte.email," "))},styles:[""]}),i})()}];let T=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=o.oAB({type:i}),i.\u0275inj=o.cJS({imports:[[a.ez,t.u5,u.Bz.forChild(C),t.UX]]}),i})()}}]);