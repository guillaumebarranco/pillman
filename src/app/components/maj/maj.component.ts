import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { DBService } from './../../services/db.service';
import { Platform } from 'ionic-angular';

declare var navigator: any;
declare var Connection: any;

@Component({
	selector: 'maj-element',
	templateUrl: './maj.html',
	styles: [`

		div {
			color: black;
		}
	`],
	providers: [ApiService, DBService]
})

export class MajComponent {
	@Output() updateMajStatus = new EventEmitter();
	medocs			: 		any;
	majDone			: 		boolean;
	majStarted 		: 		boolean 	= false;

	constructor(platform: Platform, private apiService: ApiService, private dbService: DBService) {

        platform.ready().then(() => {        	
        	this.checkNetwork();
        });
    }

	makeMaj(agreed) {

		if(agreed) {

			this.majStarted = true;
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

		} else {
			this.updateMaj();
		}
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

		if(navigator && navigator.connection) {

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

		} else {
			console.log("You are not on a device which can detect you Internet connection");
		}
    }

	updateMaj() {
		this.updateMajStatus.emit();
	}
}
