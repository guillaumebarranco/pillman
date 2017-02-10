import { Component, Input, Output, EventEmitter } from '@angular/core';
// import {NavController, SqlStorage, Storage} from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { MedocService } from './../services/medoc.service';

@Component({
	selector: 'maj-element',
	template: `
		<div>Une mise à jour est disponible</div>

		<button (click)="makeMaj()">Faire la mise à jour</button>

		<div *ngIf="!majDone">En cours...</div>

		<ul>
			<li *ngFor="let medoc of medocs">{{medoc.name}}</li>
		</ul>
	`,
	styles: [`
		
		div {
			color: black;
		}
	`],
	providers: [MedocService]
})

export class MajComponent {
	medocs: any;
	majDone: boolean;

	constructor(private medocService: MedocService) {
		console.log('majtodo');
	}

	makeMaj() {
		this.majDone = false;
		this.medocs = [];

		this.getDB().then((db: SQLite) => {

			this.getMedocs().then((medocs) => {

				console.log(medocs);

				this.deleteTable(db, (response) => {
					// console.log('response medocs', response);

					this.handleMedocTable(db, medocs, (response) => {
						// console.log('response AFTER handle', response);

						if(response.data.rows.length > 0) {
							this.medocs = [];

							for(let i = 0; i < response.data.rows.length; i++) {

								this.medocs.push({
									"name": response.data.rows.item(i).name,
									"cis": response.data.rows.item(i).cis,
									"denomination": response.data.rows.item(i).denomination,
									"side_effect": response.data.rows.item(i).side_effect,
									"forme": response.data.rows.item(i).forme
								});
							}
						}

						this.majDone = true;

						console.log('this.medocs', this.medocs);
					});
				});
			});
		});
	}

	getMedocs() {

		return new Promise((resolve, reject) => {

			this.medocService.getMedocs('a').subscribe(medocs => {

				// console.log(medocs.json());

				resolve(medocs.json());
			});
		});
	}

	formateMedocs(datas) {
		return datas;
	}

	getDB() {
		return SQLite.openDatabase({
			name: 'data.db',
			location: 'default'
		});
	}

	createMedocTable(db, callback) {

		const query = 'CREATE TABLE IF NOT EXISTS medicaments (id int(11) NOT NULL,name varchar(255) NOT NULL,cis varchar(255) NOT NULL,denomination varchar(255) NOT NULL,side_effect longtext NOT NULL,forme varchar(255) NOT NULL, PRIMARY KEY (id));'
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

	handleMedocTable(db, medocs, callback) {

		// this.createMedocTable(db, () => {

			const elements = 'name, cis, denomination, side_effect, forme';

			const queryCreate = "CREATE TABLE IF NOT EXISTS medicaments ("+elements+")";
			const queryInsert = "INSERT INTO medicaments ("+elements+") VALUES (?, ?, ?, ?, ?);";
			const querySelect = 'SELECT * FROM medicaments';

			db.transaction(function(tx) {
				tx.executeSql(queryCreate);

				for(let i in medocs) {
					tx.executeSql(queryInsert, [medocs[i].name, medocs[i].cis, medocs[i].denomination, medocs[i].side_effect, medocs[i].forme]);
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

			// }, function(error) {

			// 	console.log('Transaction ERROR: ' + error.message);

			// 	// callback({
			// 	// 	status:'error'
			// 	// });

			// }, function() {

			// 	console.log('Populated database OK');

			// 	// callback({
			// 	// 	status:'success'
			// 	// });
			});
		// });
	}

	insertMedoc(db, callback) {

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

	deleteTable(db, callback) {
		const query = "DROP TABLE medicaments";

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
}
