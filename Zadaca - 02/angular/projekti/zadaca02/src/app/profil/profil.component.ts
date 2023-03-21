import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servisi/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  korisnik : any;
  captcha : string = "";
  profil = new FormGroup({
    ime: new FormControl('', [Validators.required]),
    prezime: new FormControl('', [Validators.required]),
    lozinka: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    korime: new FormControl('', [Validators.required]),
    adresa: new FormControl('', [Validators.required])
    
  })

  constructor(private authService: AuthService, private router: Router){
    if((localStorage.getItem("loggedUser") == null)){
      alert("Korisnik nije prijavljen");
        this.router.navigate(['/login']);
    }
  }

ngOnInit(): void {
  if(this.authService.dobavi() != null){
    this.korisnik = this.authService.dobavi();
  }
}

azurirajKorisnika(){
  if(this.profil.valid && this.captcha != ""){
    this.authService.azurirajKorisnika(this.profil.value);
  }
  else if(this.captcha == ""){
    alert("Captcha nije ispunjena");
    return;
  }
  else{
    alert("Potrebno je ispuniti sva polja obrasca");
  }
}

onCaptchaResolved(response: string) {
  console.log("----------" + response + "-------------");
  this.captcha = response;
}

}
