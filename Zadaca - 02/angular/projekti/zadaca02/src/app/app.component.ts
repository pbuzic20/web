import { Component, OnInit } from '@angular/core';
import { AuthService } from './servisi/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedUser!: string | null;
  putanja = 'pocetna';
  title = 'zadaca02';

  constructor(private authService: AuthService){
   
  }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("loggedUser");
    if(this.loggedUser == ''){
      this.loggedUser = null;
    }
    console.log(this.loggedUser);
  }
  odjaviKorisnika(){
    this.loggedUser = localStorage.getItem("loggedUser");
    if(this.loggedUser == ''){
      this.loggedUser = null;
    }
    if(this.loggedUser == null){
      alert("Ne možeš se odjaviti ako nisi prijavljen!");
    }
    else{
    if(window.confirm('Jeste li sigurni da se želite odjaviti?')){
        this.authService.odjaviKorisnika();
      }
    }
  }
}
