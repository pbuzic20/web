import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { AuthService } from '../servisi/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  restServis: String = environment.restServis;
  captcha : string = "";
  prijava = new FormGroup({
    korime: new FormControl('', [Validators.required]),
    lozinka: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder){
    if((localStorage.getItem("loggedUser") != null)){
      alert("Ne možeš se prijaviti ako si već prijavljen");
        this.router.navigate(['/pocetna']);
    }
  }

  ngOnInit(): void {
    
  }

  prijaviKorisnika(){
    if(this.prijava.valid && this.captcha != ""){
      this.authService.prijaviKorisnika(this.prijava.value);
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
