const konst= require("../konstante.js");
const express = require(konst.dirModula + 'express');
const sesija = require(konst.dirModula+'express-session')
const kolacici = require(konst.dirModula+'cookie-parser')
const Konfiguracija = require("../konfiguracija");
const kodovi = require("./moduli/kodovi.js")
const jwt = require("./moduli/jwt.js")
const server = express();
let portRest = 0;
let lozinkaProfil = "";

function pokreniServer() {

    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(kolacici())
    server.use(sesija({
        secret: konst.tajniKljucSesija, 
        saveUninitialized: true,
        cookie: {  maxAge: 1000 * 60 * 60 * 3 },
        resave: false
    }));
    let port = konf.appPort;
    portRest = konf.restPort;
    
    pripremiPutanjePocetna();
    pripremiPutanjeAutentifikacija();
    pripremiPutanjeProfil();
    pripremiPutanjeFilm();
 
    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        var poruka = { greska: "Stranica nije pronađena!" };
        odgovor.send(JSON.stringify(poruka));
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na http://localhost:${port}`);
    });
}

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
    console.log(greska);
    if (process.argv.length == 2)
        console.error("Potrebno je dati naziv datoteke");
    else
        console.error("Nije moguće otvoriti datoteku: " + greska.path);
    process.exit()
});

function pripremiPutanjePocetna() {
    server.use("/", express.static(__dirname + '/angular'));
    server.use("/pocetna", express.static(__dirname + '/angular'));
    server.use("/registracija", express.static(__dirname + '/angular'));
    server.use("/login", express.static(__dirname + '/angular'));
    server.use("/profil", express.static(__dirname + '/angular'));
    server.use("/filmoviPregled", express.static(__dirname + '/angular'));
    server.use("/zanrovi", express.static(__dirname + '/angular'));
    server.use("/dokumentacija", express.static(__dirname + '/angular'));
    server.use("/filmoviPretrazivanje", express.static(__dirname + '/angular/index'));

}

function pripremiPutanjeAutentifikacija(){
    server.post("/registracija", function(zahtjev, odgovor){
        
        let tijelo = {
            korime: zahtjev.body.korime,
            lozinka: kodovi.kreirajSHA256(zahtjev.body.lozinka,"moja sol"),
            email: zahtjev.body.email,
            ime: zahtjev.body.ime,
            prezime: zahtjev.body.prezime,
            adresa : zahtjev.body.adresa
        };
        fetch("http://localhost:" + portRest + "/api/korisnici?korime=pbuzic20123456789&lozinka=patr)i1kbu.zic82s*sd", {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: {'Content-Type': 'application/json'
        }
        }).then(response => response.json())
        .then(response => {
            if(response == true){
                odgovor.send({success: true});
            } else {
                console.log("Greška");
                odgovor.send({success: false});
            }
        });
    });

    server.post('/login', function(zahtjev, odgovor){
        var korime = zahtjev.body.korime;
        var lozinka = zahtjev.body.lozinka;
        lozinkaProfil = lozinka;
        lozinka = kodovi.kreirajSHA256(lozinka, "moja sol");
        let tijelo = {
            lozinka: lozinka
        };

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        fetch("http://localhost:" + portRest + "/api/korisnici/"+korime+"/prijava?korime=pbuzic20123456789&lozinka=patr)i1kbu.zic82s*sd", {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: {'Content-Type': 'application/json'
        }
        }).then(response => response.json())
        .then(response => {
            console.log(response);
            if(response.lozinka == lozinka){
                response.lozinka = lozinkaProfil;
                zahtjev.session.korisnik = response.korime;
                zahtjev.session.ime = response.ime;
                zahtjev.session.jwt = jwt.kreirajToken(response);
                response["token"] = zahtjev.session.jwt;
                odgovor.send(response);
            }else{
                odgovor.send({success: false});
            }
        })
    });

    server.get("/odjava", function(zahtjev, odgovor){
        console.log(zahtjev.session.korisnik);
        console.log(zahtjev.session.ime);
        zahtjev.session.korisnik = null;
        zahtjev.session.jwt = null;
        odgovor.send({success: true});
    });
}

function pripremiPutanjeProfil(){
    server.post('/profil', async function(zahtjev, odgovor){
        let tijelo = {
            korime: zahtjev.body.korime,
            lozinka: kodovi.kreirajSHA256(zahtjev.body.lozinka,"moja sol"),
            email: zahtjev.body.email,
            ime: zahtjev.body.ime,
            prezime: zahtjev.body.prezime,
            adresa : zahtjev.body.adresa
        }

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }

        let azuriran = await fetch("http://localhost:" + portRest + "/api/korisnici/"+zahtjev.body.korime+"?korime=pbuzic20123456789&lozinka=patr)i1kbu.zic82s*sd", parametri);
        let reza = await azuriran.text();

        if (azuriran.status == 200) {
            console.log("Korisnik ažuriran");
            odgovor.send({success: true})
        } else {
            console.log(odgovor.status);
            console.log("------------------------"+await odgovor.text() + "--------------------------------");
            odgovor.send(null);
        }
    });
}

function pripremiPutanjeFilm(){
    server.get('/dajFilmove', async function(zahtjev, odgovor){
        if(zahtjev.session.jwt == null){
            odgovor.status(401);
            odgovor.send(null);
        }
        else{
            let podaci = await fetch("http://localhost:" + portRest + "/api/filmovi?&korime=pbuzic20123456789&lozinka=patr)i1kbu.zic82s*sd")
            let povratniPodaci = await podaci.text();
            let filmovi = JSON.parse(povratniPodaci);
            console.log("------FILMOVI------------");
            console.log(filmovi);
            odgovor.send(filmovi);
        }
    });

    server.get('/filmoviPretrazivanje', async function(zahtjev, odgovor){
        if(zahtjev.session.jwt == null){
            odgovor.status(401);
            odgovor.send(null);
        }else{
            let str = zahtjev.query.str;
            let kljucnaRijec = "";
            //let filter = zahtjev.query.filter;
            console.log(zahtjev.query)
            let putanja = await fetch("http://localhost:" + portRest + "/api/tmdb/filmovi?stranica=" + str + "&kljucnaRijec="+kljucnaRijec+"&korime=pbuzic20123456789&lozinka=patr)i1kbu.zic82s*sd");
            let podaci = await putanja.text();
            let filmovi = JSON.parse(podaci);
            console.log("----------------APP---------------------");
            console.log(filmovi)
            odgovor.send(filmovi.results);
        }
    });

    server.put('/azurirajZanr', async function(zahtjev, odgovor){
        let id = zahtjev.body.id;
        let naziv = zahtjev.body.naziv;

        let tijelo = {  
            naziv: naziv
        };

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'PUT',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }

        let podaci = await fetch("http://localhost:" + portRest + "/api/zanr/"+id+"?&korime=pbuzic20123456789&lozinka=patr)i1kbu.zic82s*sd", parametri);
        let dobiveni = await podaci.text();
        console.log(dobiveni);
        if(dobiveni == true){
        odgovor.send(dobiveni);
        }
        else{
            odgovor.send(null);
        }
    });
}