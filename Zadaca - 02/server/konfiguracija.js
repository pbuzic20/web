const ds = require("fs/promises");

class Konfiguracija {
    constructor() {
        this.konf = {};
        this.restPort = "";
        this.appPort = "";
        this.korime = "";
        this.lozinka = "";
    }

    dajKonf() {
        return this.konf;
    }

    async ucitajKonfiguraciju() {
        var podaci = await ds.readFile(process.argv[2], "UTF-8");
        this.dohvatiRestPort(podaci);
        this.dohvatiAppPort(podaci);
        this.konf = pretvoriJSONkonfig(podaci);
        this.restPort = this.konf["rest.port"];
        this.appPort = this.konf["app.port"];
        this.korime = this.konf["rest.korime"];
        this.lozinka = this.konf["rest.lozinka"];
        console.log(this.konf);
    }

       dohvatiRestPort(podaci) {
        let konf = {};
        var nizPodataka = podaci.split("\n");
        for(let podatak of nizPodataka){
            var podatakNiz = podatak.split("=");
            var naziv = podatakNiz[0];
            var vrijednost = podatakNiz[1];
            if(naziv == "rest.port"){
                return vrijednost;
            }
        }
    }

      dohvatiAppPort(podaci) {
        let konf = {};
        var nizPodataka = podaci.split("\n");
        for(let podatak of nizPodataka){
            var podatakNiz = podatak.split("=");
            var naziv = podatakNiz[0];
            var vrijednost = podatakNiz[1];
            if(naziv == "portApp"){
                return vrijednost;
            }
        }
    }
}

function pretvoriJSONkonfig(podaci) {
    console.log(podaci);
    let konf = {};
    var nizPodataka = podaci.split("\n");
    for (let podatak of nizPodataka) {
        var podatakNiz = podatak.split("=");
        var naziv = podatakNiz[0];
        var vrijednost = podatakNiz[1];
        if((naziv == "rest.korime") && (!/^(?=.*[a-zA-Z].*[a-zA-Z])(?=.*\d.*\d)[a-zA-Z0-9]{15,20}$/.test(vrijednost))){
            console.error("Korisnicko ime nije dobro");
            process.exit();
        }
        else if((naziv == "rest.lozinka") && (!/^(?=(.*[a-zA-Z].*){3,})(?=.*\d.*){3,}(?=.*\W.*){3,}[a-zA-Z0-9\S]{20,100}$/.test(vrijednost))){
            console.error("Lozinka nije dobra");
            process.exit();
        }
        else if((naziv == "app.broj.stranica") && (vrijednost < 5 || vrijednost > 100)){
            console.error("Neispravan atribut broj stranica")
            process.exit();
        }
        konf[naziv] = vrijednost;
    }
    return konf;
}


module.exports=Konfiguracija;