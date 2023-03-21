const KorisnikDAO = require("./korisnikDAO.js");
const Konfiguracija = require("../konfiguracija");

function provjera (korisnicko, password){
    if((korisnicko == "" || /^(?=.*[a-zA-Z].*[a-zA-Z])(?=.*\d.*\d)[a-zA-Z0-9]{15,20}$/.test(korisnicko) == false) || (password == "" || /^(?=(.*[a-zA-Z].*){3,})(?=.*\d.*){3,}(?=.*\W.*){3,}[a-zA-Z0-9\S]{20,100}$/.test(password) == false)){
        return false;
    }
}


exports.getKorisnici = async function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }
    else{
    let kdao = new KorisnikDAO();
    kdao.dajSve().then((korisnici) => {
        console.log(korisnici);
        odgovor.send(JSON.stringify(korisnici));
    }).catch((greska) => {
        console.log(greska);
    }) 
}
}

exports.postKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }
    else{
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    kdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
}

exports.deleteKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }
    else{
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}
}

exports.putKorisnici = function (zahtjev, odgovor) {
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

exports.getKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let kdao = new KorisnikDAO();
    let korime = zahtjev.params.korime;
    kdao.daj(korime).then((korisnik) => {
        console.log(korisnik);
        odgovor.send(JSON.stringify(korisnik));
    }).catch((greska) => {
        console.log(greska);
    });
}
}

exports.getKorisnikPrijava = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let kdao = new KorisnikDAO();
    let korime = zahtjev.params.korime;
    kdao.daj(korime).then((korisnik) => {   	
        console.log(korisnik)
        console.log(zahtjev.body)
        if(korisnik!=null && korisnik.lozinka==zahtjev.body.lozinka)
            odgovor.send(JSON.stringify(korisnik));
        else{ 
            odgovor.status(401)
            odgovor.send(JSON.stringify({greska: "Krivi podaci!"}))
        }
    }).catch((greska) =>{
        console.log(greska);
    });
    }
}
exports.postKorisnik = function (zahtjev, odgovor) {
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

exports.deleteKorisnik = function (zahtjev, odgovor) {
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

exports.putKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let korime = zahtjev.params.korime;
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    kdao.azuriraj(korime, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
}

exports.deleteKorisniciPrijava = function (zahtjev, odgovor) {
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

exports.putKorisniciPrijava = async function (zahtjev, odgovor) {
    let kdao = new KorisnikDAO();
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let korime = zahtjev.params.korime;
    let korisnik = await kdao.daj(korime);
    kdao.aktiviraj(korime, korisnik);
    odgovor.send("Korisnik je uspješno aktiviran");
    
}
}

exports.getKorisniciPrijava = function (zahtjev, odgovor) {
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

exports.putKorisniciLogin = function (zahtjev, odgovor) {
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