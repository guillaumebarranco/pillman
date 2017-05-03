import { SQLite } from 'ionic-native';

export class DBService {
	medocs: any;

	constructor() {}

	public getDB() {
		return SQLite.openDatabase({
			name: 'data.db',
			location: 'default'
		});
	}

	public makeMaj(medocs, callback) {
		this.medocs = [];

		this.getDB().then((db: SQLite) => {

			this.deleteTable(db, (response) => {

				this.handleMedocTable(db, medocs, (response) => {

					if(response.data.rows.length > 0) {
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

						callback(this.medocs);
					}
				});
			});
		});
	}

	private handleMedocTable(db, medocs, callback) {

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

					callback({
						status:'success', 
						data: rs
					});

				}, function(tx, error) {
					console.log('SELECT error: ' + error.message);

					callback({
						status: 'error'
					});
				});
			});
		// });
	}

	private createMedocTable(db, callback) {

		const query = 'CREATE TABLE IF NOT EXISTS medicaments (id int(11) NOT NULL,name varchar(255) NOT NULL,cis varchar(255) NOT NULL,dci varchar(255) NOT NULL,effects longtext NOT NULL,forme varchar(255) NOT NULL, PRIMARY KEY (id));'
		;

		console.log('db', db);

		db.transaction(function(tx) {
			tx.executeSql(query);
		}, function(error) {

			console.log('Transaction ERROR: ' + error.message);
			callback({
				status: 'error'
			});

		}, function() {

			callback({
				status: 'success'
			});
		});
	}

	private insertMedoc(db, callback) {

		const query = "INSERT INTO medicaments (name) VALUES (?);";

		db.transaction(function(tx) {

			tx.executeSql(query, ['ACETYLLEUCINE BIOGARAN 500 mg, comprimé']);

		}, function(error) {

			console.log('Transaction ERROR: ' + error.message);

			callback({
				status:'error'
			});

		}, function() {

			console.log('Populated database OK');

			callback({
				status:'success'
			});
		});
	}

	private deleteTable(db, callback) {
		const query = "DROP TABLE medicaments";

		db.transaction(function(tx) {
			tx.executeSql(query);
		}, function(error) {

			console.log('Transaction ERROR: ' + error.message);
			callback({
				status: 'error'
			});

		}, function() {

			callback({
				status: 'success'
			});
		});
	}
}
