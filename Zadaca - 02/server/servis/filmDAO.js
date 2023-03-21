const Baza = require("./baza.js");

class FilmDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		let sql = "SELECT * FROM film;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		return podaci;
	}

	daj = async function (film) {
		let sql = "SELECT * FROM film WHERE id=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [film]);
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}
    azuriraj = async function (id, film) {
		let sql = `UPDATE film SET naziv=?, godina_izlaska=?, trajanje=?, opis=?, budget=?, jezik=?, prihod=? WHERE id=?`;
        let podaci = [film.naziv,film.godina_izlaska,
                      film.trajanje,film.opis, film.budget, film.jezik, film.prihod, id];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
    obrisi = async function (id) {
		let sql = "DELETE FROM film WHERE id=?";
		await this.baza.izvrsiUpit(sql,[id]);
		return true;
	}
	stranici = async function(filmovi, stranica, brojFilmova, naziv, sortiraj, datum, zanr){
		if((!stranica || stranica == 0) && (!brojFilmova || brojFilmova == 0)){
			return filmovi;
		}
		let sort = "";
		if(sortiraj != null && sortiraj =="n")
			sort = "naziv";
		else if(sortiraj != null && sortiraj == "d")
			sort = "datum";
		let sql = "SELECT * FROM film";
		if(datum != null){
			sql +=" WHERE datum ="+datum+"";
		}
		if(naziv != null){
			sql += " WHERE naziv ="+naziv+"";
		}
		if(sortiraj != null){
			sql +=" ORDER BY "+sort+"";
		}
		if(zanr != null){
			let upit = "SELECT film.naziv FROM film INNER JOIN film_zanr ON film.id = film_zanr.film_id INNER JOIN zanr ON zanr.id = film_zanr.zanr_id WHERE zanr.id = "+zanr+" LIMIT " + brojFilmova + " OFFSET " + ((stranica-1)*brojFilmova) + ";";
			var podaci = await this.baza.izvrsiUpit(upit, []);
			return podaci;
		}
		sql += " LIMIT " + brojFilmova + " OFFSET " + ((stranica-1)*brojFilmova) + ";";
		var podaci = await this.baza.izvrsiUpit(sql, []);
		return podaci;
	}
}

module.exports = FilmDAO;