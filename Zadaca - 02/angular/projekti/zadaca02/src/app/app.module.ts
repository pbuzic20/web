import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { ProfilComponent } from './profil/profil.component';
import { FilmoviPregledComponent } from './filmovi-pregled/filmovi-pregled.component';
import { FilmoviPretrazivanjeComponent } from './filmovi-pretrazivanje/filmovi-pretrazivanje.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ZanroviComponent } from './zanrovi/zanrovi.component';

const routes:Routes = [
  {path:"registracija", component:RegistracijaComponent},
  {path:"pocetna", component:PocetnaComponent},
  {path:"login", component:LoginComponent},
  {path:"dokumentacija", component:DokumentacijaComponent},
  {path:"profil", component:ProfilComponent},
  {path:"filmoviPregled", component:FilmoviPregledComponent},
  {path:"filmoviPretrazivanje", component:FilmoviPretrazivanjeComponent},
  {path:"zanrovi", component:ZanroviComponent},
  {path:"",redirectTo:"pocetna",pathMatch:"full"}
];

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    LoginComponent,
    RegistracijaComponent,
    DokumentacijaComponent,
    ProfilComponent,
    FilmoviPregledComponent,
    FilmoviPretrazivanjeComponent,
    ZanroviComponent,
  ],
  imports: [
    BrowserModule,FormsModule,RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
