import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UtilService } from '../../../services/util.service';
import { ApiService } from '../../../services/api.service';

@Component({
	selector: 'page-options',
	templateUrl: './options.html',
	providers: [UtilService, ApiService]
})

export class OptionsPage {
	@Input() theme;
	@Output() changeTheme = new EventEmitter();
	@Output() updateMajStatus = new EventEmitter();
	username: string;
	text: string;

	constructor(private utilService: UtilService, private apiService: ApiService) {

		this.getTheme();
		console.log('this theme', this.theme);

		if(typeof localStorage.getItem('firstname') !== null) {
			this.username = localStorage.getItem('firstname');
		}
	}

	public updateTheme() {
		localStorage.setItem("theme", this.theme);
		this.changeTheme.emit(this.theme);
	}

	public updateUsername() {
		localStorage.setItem("firstname", this.username);
	}

	public makeMaj() {
		this.utilService.checkMaj(this.apiService).then((response) => {

			console.log('to do', response);

			if(response) {
				this.updateMajStatus.emit();
			} else {
				this.text = "Il n'y a pas de nouvelle mise à jour disponible";
			}
		});
	}

	private getTheme() {

		if(localStorage.getItem('theme') !== null) {
			this.theme = localStorage.getItem('theme');
		}
	}
}
