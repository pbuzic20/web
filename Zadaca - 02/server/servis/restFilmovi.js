const FilmDAO = require("./filmDAO.js");

function provjera (korisnicko, password){
    if((korisnicko == "" || /^(?=.*[a-zA-Z].*[a-zA-Z])(?=.*\d.*\d)[a-zA-Z0-9]{15,20}$/.test(korisnicko) == false) || (password == "" || /^(?=(.*[a-zA-Z].*){3,})(?=.*\d.*){3,}(?=.*\W.*){3,}[a-zA-Z0-9\S]{20,100}$/.test(password) == false)){
        return false;
    }
}

exports.getFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let fdao = new FilmDAO();
    let filmid = zahtjev.params.id;
    fdao.daj(filmid).then((film) => {
        console.log(film);
        odgovor.send(JSON.stringify(film));
    });
}
}

exports.postFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" }
    odgovor.send(JSON.stringify(poruka));
}
}

exports.putFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let fdao = new FilmDAO();
    fdao.azuriraj(id, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
}

exports.deleteFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let fdao = new FilmDAO();
    let filmid = zahtjev.params.id;
    fdao.obrisi(filmid).then((film) => {
        console.log(film);
        odgovor.send(JSON.stringify(film));
    });
}
}

exports.getFilms = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let fdao = new FilmDAO();
    let stranica = zahtjev.query.stranica;
    let brojFilmova = zahtjev.query.brojFilmova
    let naziv = zahtjev.query.naziv;
    let sortiraj = zahtjev.query.sortiraj;
    let datum = zahtjev.query.datum;
    let idZanr = zahtjev.query.zanr;
    let filmovi = fdao.dajSve();
    fdao.stranici(filmovi, stranica, brojFilmova, naziv, sortiraj, datum, idZanr).then((poruka) =>{
        odgovor.send(JSON.stringify(poruka));
    });
}
}

exports.deleteFilms = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}
}

exports.putFilms = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}
}



