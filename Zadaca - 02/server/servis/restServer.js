const konst = require("../konstante.js");
const express = require(konst.dirModula + 'express');
const Konfiguracija = require("../konfiguracija");
const restKorisnici = require("./restKorisnik.js")
const RestTMDB = require("./restTMDB");
const RestFilm = require('./restFilmovi.js');
const RestZanr = require('./restZanr.js');
const server = express();
const cors = require(konst.dirModula + 'cors')
let korime="";
let lozinka="";


let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
    if (process.argv.length == 2)
        console.error("Potrebno je unjeti naziv datoteke!");
    else
        console.error("Naziv datoteke nije dobar: " + greska.path);
    process.exit()
});



function pokreniServer() {
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cors());

    var corsOptions = {
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200 }
        
        

    pripremiPutanjeKorisnik();
    pripremiPutanjeTMDB();
    pripremiPutanjeFilmovi();
    pripremiPutanjeZanrovi();

    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        let poruka = { greska: "Stranica nije pronađena!" }
        odgovor.json(poruka);
    });

    let port = konf.restPort;
    korime = konf.korime;
    lozinka = konf.lozinka;
    server.listen(port, () => {
        console.log(`Server pokrenut na http:localhost: ${port}`);
    });
}

function pripremiPutanjeKorisnik(){
    server.get("/api/korisnici/",restKorisnici.getKorisnici);
    server.post("/api/korisnici/",restKorisnici.postKorisnici);
    server.put("/api/korisnici/",restKorisnici.putKorisnici);
    server.delete("/api/korisnici/",restKorisnici.deleteKorisnici);

    server.get("/api/korisnici/:korime",restKorisnici.getKorisnik);
    server.post("/api/korisnici/:korime",restKorisnici.postKorisnik);
    server.put("/api/korisnici/:korime",restKorisnici.putKorisnik);
    server.delete("/api/korisnici/:korime",restKorisnici.deleteKorisnik);
    

    server.get("/api/korisnici/:korime/prijava",restKorisnici.getKorisniciPrijava);
    server.post("/api/korisnici/:korime/prijava",restKorisnici.getKorisnikPrijava);
    server.put("/api/korisnici/:korime/prijava",restKorisnici.putKorisniciLogin);
    server.delete("/api/korisnici/:korime/prijava",restKorisnici.deleteKorisniciPrijava);

    server.get("/api/korisnici/:korime/aktivacija",restKorisnici.getKorisniciPrijava);
    server.post("/api/korisnici/:korime/aktivacija",restKorisnici.postKorisnik);
    server.put("/api/korisnici/:korime/aktivacija",restKorisnici.putKorisniciPrijava);
    server.delete("/api/korisnici/:korime/aktivacija",restKorisnici.deleteKorisniciPrijava);
}

function pripremiPutanjeTMDB() {
    let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
    server.get("/api/tmdb/zanr",restTMDB.getZanr.bind(restTMDB));
    server.post("/api/tmdb/zanr",restTMDB.postZanr.bind(restTMDB));
    server.put("/api/tmdb/zanr",restTMDB.putZanr.bind(restTMDB));
    server.delete("/api/tmdb/zanr",restTMDB.deleteZanr.bind(restTMDB));

    server.get("/api/tmdb/filmovi",restTMDB.getFilmovi.bind(restTMDB));
    server.post("/api/tmdb/filmovi",restTMDB.postFilmovi.bind(restTMDB));
    server.put("/api/tmdb/filmovi",restTMDB.putFilmovi.bind(restTMDB));
    server.delete("/api/tmdb/filmovi",restTMDB.deleteFilmovi.bind(restTMDB));
}

function pripremiPutanjeFilmovi(){
    server.get("/api/filmovi/:id", RestFilm.getFilm);
    server.post("/api/filmovi/:id",RestFilm.postFilm);
    server.put("/api/filmovi/:id", RestFilm.putFilm);
    server.delete("/api/filmovi/:id", RestFilm.deleteFilm);

    server.get("/api/filmovi/", RestFilm.getFilms);
    server.put('/api/filmovi/', RestFilm.putFilms);
    server.delete('/api/filmovi/', RestFilm.deleteFilms);
}

function pripremiPutanjeZanrovi(){
    server.get("/api/zanr/", RestZanr.getZanrovi);
    server.post("/api/zanr/",RestZanr.postZanrovi);
    server.put('/api/zanr/', RestZanr.putZanrovi);
    server.delete('/api/zanr/', RestZanr.deleteZanrovi);

    server.get("/api/zanr/:id", RestZanr.getZanr);
    server.post("/api/zanr/:id",RestZanr.postZanr);
    server.put('/api/zanr/:id', RestZanr.putZanr);
    server.delete('/api/zanr/:id', RestZanr.deleteZanr);
}

