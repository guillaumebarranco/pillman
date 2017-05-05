import { SQLite } from 'ionic-native';

import Medoc from '../classes/medoc';
import Success from '../classes/success';
import Error from '../classes/error';

export class DBService {
	medocs: any;

	constructor() {}

	public getDB() : Promise<SQLite> {

		return SQLite.openDatabase({
			name: 'data.db',
			location: 'default'
		});
	}

	public makeMaj(medocs: Medoc[]) : Promise<Medoc[]> {

		return new Promise((resolve, reject) => {

			this.medocs = [];

			this.getDB().then((db: SQLite) => {

				this.deleteTable(db).then((response) => {

					this.handleMedocTable(db, medocs).then((response: Success) => {

						if(typeof response.data !== "undefined" && response.data.rows.length > 0) {
							this.medocs = [];

							for(let i = 0; i < response.data.rows.length; i++) {

								this.medocs.push({
									"name": response.data.rows.item(i).name,
									"cis": response.data.rows.item(i).cis,
									"dci": response.data.rows.item(i).dci,
									"effects": response.data.rows.item(i).effects,
									"forme": response.data.rows.item(i).forme
								});
							}

							return resolve(this.medocs);
						}

					}).catch((response: Error) => {
						console.log(response);
					});
				});
			});
		});
	}

	private handleMedocTable(db, medocs: Medoc[]) : Promise<any> {

		return new Promise((resolve, reject) => {

			// this.createMedocTable(db, () => {

				const elements = 'name, cis, dci, effects, forme';

				const queryCreate = "CREATE TABLE IF NOT EXISTS medicaments ("+elements+")";
				const queryInsert = "INSERT INTO medicaments ("+elements+") VALUES (?, ?, ?, ?, ?);";
				const querySelect = 'SELECT * FROM medicaments';

				db.transaction(function(tx) {
					tx.executeSql(queryCreate);

					for(let i in medocs) {
						tx.executeSql(queryInsert, [medocs[i].name, medocs[i].cis, medocs[i].dci, medocs[i].effects, medocs[i].forme]);
					}

					tx.executeSql(querySelect, [], function(tx, rs) {

						return resolve({
							status:'success', 
							data: rs
						});

					}, function(tx, error) {
						console.log('SELECT error: ' + error.message);

						return reject({
							status: 'error'
						});
					});
				});
			// });
		});
	}

	private createMedocTable(db) {

		return new Promise((resolve, reject) => {

			const query = 'CREATE TABLE IF NOT EXISTS medicaments (id int(11) NOT NULL,name varchar(255) NOT NULL,cis varchar(255) NOT NULL,dci varchar(255) NOT NULL,effects longtext NOT NULL,forme varchar(255) NOT NULL, PRIMARY KEY (id));'
			;

			console.log('db', db);

			db.transaction(function(tx) {
				tx.executeSql(query);
			}, function(error) {

				return reject({
					status: 'error',
					message: 'Transaction ERROR: ' + error.message
				});

			}, function() {

				return resolve({
					status: 'success'
				});
			});
		});
	}

	private insertMedoc(db, callback) {

		const query = "INSERT INTO medicaments (name) VALUES (?);";

		db.transaction(function(tx) {

			tx.executeSql(query, ['ACETYLLEUCINE BIOGARAN 500 mg, comprimé']);

		}, function(error) {

			console.log();

			callback({
				status:'error',
				message: 'Transaction ERROR: ' + error.message
			});

		}, function() {

			console.log('Populated database OK');

			callback({
				status:'success',
				data: {}
			});
		});
	}

	private deleteTable(db) {

		return new Promise((resolve, reject) => {

			const query = "DROP TABLE medicaments";

			db.transaction(function(tx) {
				tx.executeSql(query);
			}, function(error) {

				reject({
					status: 'error',
					message: 'Transaction ERROR: ' + error.message
				});

			}, function() {

				resolve({
					status: 'success',
					data: {}
				});
			});
		});
	}

	public searchMedoc(first) {

		return new Promise((resolve, reject) => {

			this.getDB().then((db: SQLite) => {

				const elements = 'name, cis, dci, effects, forme';
				const querySelect = 'SELECT * FROM medicaments';

				db.transaction(function(tx) {

					tx.executeSql(querySelect, [], function(tx, rs) {

						resolve({
							status:'success', 
							data: rs
						});

					}, function(tx, error) {
						console.log('SELECT error: ' + error.message);

						resolve({
							status: 'error'
						});
					});
				});
			});
		});
	}
}
