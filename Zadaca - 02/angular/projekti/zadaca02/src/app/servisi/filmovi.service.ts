import { Injectable, resolveForwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { FilmoviI } from './FilmoviI';
import { FilmoviTMDB } from './FilmoviTMDB';
import { ZanroviI } from './ZanroviI';

@Injectable({
  providedIn: 'root'
})
export class FilmoviService {
  restServis?: string = environment.restServis;
  appRest? : String = environment.appRest;
  filmovi? : any;
  zanrovi : any;
  sviFilmovi? : any;
  sviFilmoviTMDB : any;

  constructor(private router: Router) { 
    
  }

  async osvjeziZanrove() {
    let o = (await fetch(this.restServis + "zanr?korime=pbuzic20123456789&lozinka=patr)i1kbu.zic82s*sd")) as Response;
    if(o.status == 200){
      console.log("Uspjesan dohvat zanrova")
      let r = JSON.parse(await o.text()) as ZanroviI;
      this.zanrovi = r;
      console.log(r);
      localStorage.setItem("zanrovi", JSON.stringify(r));
      return this.zanrovi;
    }
  }

  async dajFilm(id : number) {
    let o = (await fetch(this.restServis + "filmovi?zanr="+id+"&stranica=1&brojFilmova=2&korime=pbuzic20123456789&lozinka=patr)i1kbu.zic82s*sd")) as Response;
    if(o.status == 200){
      console.log("Uspjesan dohvat filmova")
      let r = JSON.parse(await o.text()) as FilmoviI;;
      this.filmovi = r;
      console.log(r);
      localStorage.setItem("filmovi", JSON.stringify(r));
      return this.filmovi;
    }
  }

   async dohvatiSveFilmove() {
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let parametri = {
      method: 'GET',
      headers: zaglavlje
    }

    const response = await fetch(this.appRest + '/dajFilmove', parametri);
    const filmovi = JSON.parse(await response.text()) as FilmoviI;
    this.sviFilmovi = filmovi;
    return this.sviFilmovi;
   }

   async dohvatiFilmoveTMDB(){
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let parametri = {
      method: 'GET',
      headers: zaglavlje
    }

    const response = await fetch(this.appRest + '/filmoviPretrazivanje?str=1', parametri);
    console.log(response);
    let filmovitmdb = JSON.parse(await response.text()) as FilmoviTMDB;
    console.log(filmovitmdb);
    this.sviFilmoviTMDB = filmovitmdb;
    return this.sviFilmoviTMDB;
   }

   async azurirajZanr(zanr: ZanroviI, name: string){
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    const obj = {
      id: zanr.id,
      naziv: name
    };

    let parametri = {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: zaglavlje
    }

    let odgovor = await fetch(this.appRest + '/azurirajZanr', parametri);
    let podaci = await odgovor.text();
    if(podaci != null){
        alert("Žanr uspješno ažuriran");
        window.location.reload();
    }
    else{
      alert("Neuspješno ažuriranje žanra")
    }
   }
}
