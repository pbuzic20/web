const ZanrDAO = require("./zanrDAO.js");

function provjera (korisnicko, password){
    if((korisnicko == "" || /^(?=.*[a-zA-Z].*[a-zA-Z])(?=.*\d.*\d)[a-zA-Z0-9]{15,20}$/.test(korisnicko) == false) || (password == "" || /^(?=(.*[a-zA-Z].*){3,})(?=.*\d.*){3,}(?=.*\W.*){3,}[a-zA-Z0-9\S]{20,100}$/.test(password) == false)){
        return false;
    }
}


exports.getZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let zdao = new ZanrDAO();
    zdao.dajSve().then((zanrovi) => {
        console.log(zanrovi);
        odgovor.send(JSON.stringify(zanrovi));
    });
}
}

exports.postZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let podaci = zahtjev.body;
    let zdao = new ZanrDAO();
    zdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
}

exports.deleteZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let zdao = new ZanrDAO();
    zdao.obrisiSve().then((zanr) => {
        console.log(zanr);
        odgovor.send(JSON.stringify(zanr));
    });
}
}

exports.putZanrovi = function (zahtjev, odgovor) {
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

exports.getZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let zdao = new ZanrDAO();
    let zanrid = zahtjev.params.id;
    zdao.daj(zanrid).then((zanr) => {
        console.log(zanr);
        odgovor.send(JSON.stringify(zanr));
    });
}
}

exports.postZanr = function (zahtjev, odgovor) {
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

exports.deleteZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let zdao = new ZanrDAO();
    let zanrid = zahtjev.params.id;
    zdao.obrisi(zanrid).then((zanr) => {
        console.log(zanr);
        odgovor.send(JSON.stringify(zanr));
    });
}
}

exports.putZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    if(provjera(zahtjev.query.korime, zahtjev.query.lozinka) == false){
        odgovor.status(400);
        let poruka = { greska: "Nevaljani zahtjev" }
        odgovor.send(JSON.stringify(poruka));
    }else{
    let zanrid = zahtjev.params.id;
    let podaci = zahtjev.body;
    let zdao = new ZanrDAO();
    zdao.azuriraj(zanrid, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
}
