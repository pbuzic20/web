import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servisi/auth.service';
import { FilmoviService } from '../servisi/filmovi.service';
import { FilmoviI } from '../servisi/FilmoviI';

@Component({
  selector: 'app-filmovi-pregled',
  templateUrl: './filmovi-pregled.component.html',
  styleUrls: ['./filmovi-pregled.component.scss']
})
export class FilmoviPregledComponent implements OnInit {
  filmovi: FilmoviI[] = [];

constructor(private authService: AuthService, private filmoviServis: FilmoviService, private router: Router){
  if((localStorage.getItem("loggedUser") == null)){
    alert("Korisnik nije prijavljen");
      this.router.navigate(['login']);
  }
}

  ngOnInit(): void {
    this.filmoviServis.dohvatiSveFilmove().then((filmovi: any) => {
      this.filmovi = filmovi;
      console.log(this.filmovi);
    })
  }
}
