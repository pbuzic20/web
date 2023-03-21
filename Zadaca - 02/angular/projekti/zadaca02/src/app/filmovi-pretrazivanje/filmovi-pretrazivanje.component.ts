import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servisi/auth.service';
import { FilmoviService } from '../servisi/filmovi.service';
import { FilmoviTMDB } from '../servisi/FilmoviTMDB';

@Component({
  selector: 'app-filmovi-pretrazivanje',
  templateUrl: './filmovi-pretrazivanje.component.html',
  styleUrls: ['./filmovi-pretrazivanje.component.scss']
})
export class FilmoviPretrazivanjeComponent implements OnInit {
    filmovi: FilmoviTMDB [] = [];
    sviFilmovi: FilmoviTMDB [] = [];
    filter: string = "";

  constructor(private authService: AuthService, private filmoviServis: FilmoviService, private router: Router){
    if((localStorage.getItem("loggedUser") == null)){
      alert("Korisnik nije prijavljen");
        this.router.navigate(['login']);
    }
  }
  ngOnInit(): void {
    this.filmoviServis.dohvatiFilmoveTMDB().then((filmovi: any) => {
      this.filmovi = filmovi;
      this.sviFilmovi = this.filmovi;
      console.log("-------FILMOVI TMDB-------------");
      console.log(this.filmovi);
    })
  }

  filtriraj() {
    this.filmovi = new Array<FilmoviTMDB>();
    for(let film of this.sviFilmovi){
      if(film.original_title.toLocaleLowerCase()
        .includes(this.filter.toLocaleLowerCase())){
          this.filmovi.push(film);
        }
    }
  }

}
