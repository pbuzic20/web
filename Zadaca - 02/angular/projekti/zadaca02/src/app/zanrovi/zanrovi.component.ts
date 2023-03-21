import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servisi/auth.service';
import { FilmoviService } from '../servisi/filmovi.service';
import { ZanroviI } from '../servisi/ZanroviI';

@Component({
  selector: 'app-zanrovi',
  templateUrl: './zanrovi.component.html',
  styleUrls: ['./zanrovi.component.scss']
})
export class ZanroviComponent implements OnInit {
  zanrovi : ZanroviI [] = [];

  constructor(private servis: FilmoviService, private authService: AuthService, private router: Router){
    if((localStorage.getItem("loggedUser") == null)){
      alert("Korisnik nije prijavljen");
        this.router.navigate(['login']);
    }
  }
  ngOnInit(): void {
      this.servis.osvjeziZanrove().then(zanrovi => {
        this.zanrovi = zanrovi;
      });
  }

  azuriraj(zanr: ZanroviI, naziv: string){
    console.log("Ažuriram žanr: " + zanr.naziv);
    if(naziv != ""){
      this.servis.azurirajZanr(zanr, naziv);

    }
    else{
      alert("Potrebno je ispuniti tekstualno polje");
      return;
    }

  }
}
