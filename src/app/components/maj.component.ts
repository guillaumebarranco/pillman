import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { DBService } from './../services/db.service';
import { Alert, Platform } from 'ionic-angular';

declare var navigator: any;
declare var Connection: any;

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
	providers: [ApiService, DBService]
})

export class MajComponent {
	medocs: any;
	majDone: boolean;

	constructor(platform: Platform, private apiService: ApiService, private dbService: DBService) {
		console.log('majtodo');

        platform.ready().then(() => {        	
        	this.checkNetwork();
        });
    }

	makeMaj() {
		this.majDone = false;
		this.medocs = [];

		console.log('begin maj');

		this.getMedocs().then((medocs) => {

			this.dbService.makeMaj(medocs, (response) => {

				this.medocs = response;
				this.majDone = true;

				console.log('end maj', this.medocs);
			});
		});
	}

	getMedocs() {

		return new Promise((resolve, reject) => {

			this.apiService.getMedocs().subscribe(medocs => {
				resolve(medocs.json());
			});
		});
	}

	formateMedocs(datas) {
		return datas;
	}

	checkNetwork() {

        const networkState = navigator.connection.type;
        const states = {};

        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        if(networkState === Connection.WIFI) {
        	console.log('is wifi');
        }
    }
}
