const Baza = require("./baza.js");
const kodovi = require("../aplikacija/moduli/kodovi")

class KorisnikDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		let sql = "SELECT * FROM korisnik;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		return podaci;
	}

	daj = async function (korime) {
		let sql = "SELECT * FROM korisnik WHERE korime=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (korisnik) {
		console.log(korisnik)
		let sql = `INSERT INTO korisnik (korime,lozinka,email,ime,prezime,adresa,tip_korisnika_id,aktivacijskiKod,aktiviran) VALUES (?,?,?,?,?,?,?,?,?)`;
        let podaci = [korisnik.korime,korisnik.lozinka,
			korisnik.email,korisnik.ime,korisnik.prezime, korisnik.adresa, 2, null, "da"];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}

	obrisi = async function (korime) {
		let sql = "DELETE FROM korisnik WHERE korime=?";
		await this.baza.izvrsiUpit(sql,[korime]);
		return true;
	}

	azuriraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET korime=?, lozinka=?, email=?, ime=?, prezime=?, adresa=? WHERE korime=?`;
        let podaci = [korisnik.korime,korisnik.lozinka,
			korisnik.email,korisnik.ime,korisnik.prezime,korisnik.adresa,korime];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
	aktiviraj = async function (korime, korisnik) {
		this.baza = new Baza();
		let sql = `UPDATE korisnik SET aktiviran=? WHERE korime=?`;
        let podaci = ["da",korime];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
}

module.exports = KorisnikDAO;