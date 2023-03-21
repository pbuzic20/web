import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  restServis? : String = environment.restServis;
  appRest? : String = environment.appRest;
  user: any;
  constructor(private router: Router) { }

  registrirajKorisnika(korisnik: any){
    fetch(this.appRest + '/registracija', {
        method: 'POST',
        body: JSON.stringify(korisnik),
        headers : {
          'Content-Type' : 'application/json'
        }
      }).then(response => response.json()).then(response=>{
        if(response.success){
          console.log("Korisnik uspješno ubačen na servis");
          this.router.navigate(['login']);
        }
      });
  }
   prijaviKorisnika(korisnik : any){
    fetch(this.appRest + '/login', {
      method: 'POST',
      body: JSON.stringify(korisnik),
      headers: {'Content-Type': 'application/json'
    }
    }).then(response => response.json()).then(response => {
      setTimeout(() => {
      if(response.success == null){
        console.log("Korisnik je uspješno prijavljen");
        this.user = response;
        console.log("JWT:" + this.user.token);
        localStorage.setItem("loggedUser", JSON.stringify(response));
        this.router.navigate (['/pocetna'])
      }
      else if(response.success == false){
        console.log("Dogodila se greška");
        return;
      }
    }, 1000);
    });
  }
  odjaviKorisnika(){
    fetch(this.appRest + '/odjava', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())
    .then(response => {
      if(response.success){
        localStorage.removeItem('loggedUser');
        this.user = null;
        this.router.navigate(['/'])
      }
    })
  }

  dobavi() : any {
    const storedObject = localStorage.getItem('loggedUser');
    if(storedObject != null){
    const parsedObject = JSON.parse(storedObject);  
    return parsedObject;
    }
    
  }

  async azurirajKorisnika(korisnik : any){
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let parametri = {
      method: 'POST',
      body: JSON.stringify(korisnik),
      headers: zaglavlje
    }

    const response = await fetch(this.appRest + '/profil', parametri);
    let odgovor = await response.text();
    console.log("----------------" + odgovor + "-------------------");

    if(odgovor != null){
      console.log("Korisnik uspješno ažuriran");
      localStorage.setItem("loggedUser", JSON.stringify(korisnik));
      alert("Korisnik ažuriran");
      window.location.reload();
    }
    else{
      alert("Dogodila se greška");
      return;
    }
  }
}
