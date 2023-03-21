import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { AuthService } from '../servisi/auth.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent implements OnInit {
  restServis: String = environment.restServis;
  captcha : string = "";
  registracija = new FormGroup({
    ime: new FormControl('', [Validators.required]),
    prezime: new FormControl('', [Validators.required]),
    lozinka: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    adresa: new FormControl('', [Validators.required]),
    korime: new FormControl('', [Validators.required]),
  })


  constructor(private authService: AuthService, private router: Router){
    if((localStorage.getItem("loggedUser") != null)){
      alert("Ne možeš se registrirati ako si već prijavljen");
        this.router.navigate(['/pocetna']);
    }
  }
  
  ngOnInit(): void {

  }

  registrirajKorisnika() {
    if(this.registracija.valid && this.captcha != ""){
      this.authService.registrirajKorisnika(this.registracija.value)
    }
    else if(this.captcha == ""){
      alert("Captcha nije ispunjena");
      return;
    }else{
      alert("Potrebno je ispuniti sva polja obrasca");
    }
  }

  onCaptchaResolved(response: string) {
    console.log("----------" + response + "-------------");
    this.captcha = response;
  }
}
