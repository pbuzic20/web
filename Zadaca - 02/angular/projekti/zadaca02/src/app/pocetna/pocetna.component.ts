import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { FilmoviService } from '../servisi/filmovi.service';
import { ZanroviI } from '../servisi/ZanroviI';
import { FilmoviI } from '../servisi/FilmoviI';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss']
})
export class PocetnaComponent implements OnInit {
zanrovi: ZanroviI[] = [];
filmovi!: { [zanrId: number]: FilmoviI[]; };

constructor(private filmoviServis: FilmoviService){
   
}
ngOnInit(): void {
  this.filmoviServis.osvjeziZanrove().then(zanrovi => {
    this.zanrovi = zanrovi;

    this.zanrovi.forEach((zanr: { id: number; }) => {
      this.filmoviServis.dajFilm(zanr.id).then(filmovi => {
        if(this.filmovi){
          this.filmovi[zanr.id] = filmovi;
        }else{
          this.filmovi = { [zanr.id]: filmovi};
        }
      })
    })
  })
}
}
