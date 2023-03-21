const Baza = require("./baza.js");

class ZanrDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		let sql = "SELECT * FROM zanr;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		return podaci;
	}

	daj = async function (film) {
		let sql = "SELECT * FROM zanr WHERE id=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [film]);
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}
    azuriraj = async function (id, zanr) {
		let sql = `UPDATE zanr SET naziv=? WHERE id=?`;
        let podaci = [zanr.naziv, id];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
    obrisi = async function (id) {
		let sql = "DELETE FROM zanr WHERE id=?";
		await this.baza.izvrsiUpit(sql,[id]);
		return true;
	}

    obrisiSve = async function () {
		let sql = "DELETE FROM zanr WHERE id NOT IN (SELECT f.zanr_id FROM film_zanr f)";
		await this.baza.izvrsiUpit(sql,[]);
		return true;
	}

    dodaj = async function (zanr) {
		console.log(zanr)
		let sql = `INSERT INTO zanr (naziv) VALUES (?)`;
        let podaci = [zanr.naziv];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
}

module.exports = ZanrDAO;