import { Component, Output, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';

import { ApiService } from '../../../services/api.service';
import { DBService } from '../../../services/db.service';
import { SessionService } from '../../../services/session.service';

import Medoc from '../../../classes/medoc';

declare var navigator: any;
declare var Connection: any;

@Component({
	selector: 'maj-element',
	templateUrl: './maj.html',
	styles: [`

		div {
			color: black;
		}

		.page {
			text-align: center;
			margin-top: 100px;
		}

		.buttons-maj  {
			display: flex;
			justify-content: space-around;
		}
	`],
	providers: [ApiService, DBService, SessionService]
})

export class MajPage {
	@Output() updateMajStatus = new EventEmitter();
	medocs			: 		Medoc[];
	majDone			: 		boolean;
	majStarted 		: 		boolean 	= false;
	hello			:		string;
	theme = "default";
	text 			: 		string 		= "Une mise à jour est disponible";

	constructor(public platform: Platform, private apiService: ApiService, private dbService: DBService, private sessionService: SessionService) {
        this.hello = this.getHelloText();
    }

    getHelloText() {

    	const date = new Date();
        const hour = date.getHours();

    	let hello = "";

    	if(hour < 17) {
        	hello = "Bonjour";
        } else {
        	hello = "Bonsoir";
        }

        if(this.sessionService.firstnameExists()) {
        	hello += " " + this.sessionService.getFirstname();
        } else {
        	hello += ' à vous';
        }

        return hello;
    }

	makeMaj(agreed) {

		if(agreed) {

			this.platform.ready().then(() => {  

	        	this.checkNetwork().then(() => {

					this.majStarted = true;
					this.majDone = false;
					this.medocs = [];

					console.log('begin maj');

					this.getMedocs().then((medocs) => {

						this.dbService.makeMaj(medocs).then((response) => {

							this.medocs = response;
							this.majDone = true;

							this.sessionService.setLastMajVersion(this.sessionService.getCurrentApiVersion())

							console.log('end maj', this.medocs);
						});
					});

	        	}).catch(() => {
	        		console.log('not on wifi');
	        	});
	        });

		} else {
			this.updateNextMajProposalDate();
			this.updateMaj();
		}		
	}

	updateNextMajProposalDate() {

		const today = new Date();
    	const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);

		const timestamp = nextweek.getTime();
		const wait = true;

		this.sessionService.setNextProposalUpdate(timestamp.toString());
		this.sessionService.setWaitForProposal(wait.toString());
	}

	getMedocs() : Promise<Medoc[]> {

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

		return new Promise((resolve, reject) => {

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
		        	return resolve();
		        }

			} else {
				console.log("You are not on a device which can detect you Internet connection");
			}

			return reject();
		});
    }

	updateMaj() {
		this.updateMajStatus.emit();
	}
}
