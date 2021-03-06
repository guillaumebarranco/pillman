import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UtilService } from '../../../services/util.service';
import { ApiService } from '../../../services/api.service';
import { SessionService } from '../../../services/session.service';

@Component({
	selector: 'page-options',
	templateUrl: './options.html',
	providers: [UtilService, ApiService, SessionService],
	styles: [`
		select {
			color: #000;
		}
	`]
})

export class OptionsPage {
	@Input() theme;
	@Output() changeTheme = new EventEmitter();
	@Output() updateMajStatus = new EventEmitter();
	username: string;
	text: string;
	majVersion: string = '0.0.0';

	constructor(private utilService: UtilService, private apiService: ApiService, private sessionService: SessionService) {

		this.getTheme();
		this.majVersion = this.sessionService.getLastMajVersion();

		if(this.sessionService.firstnameExists()) {
			this.username = this.sessionService.getFirstname();
		}
	}

	public updateTheme() {
		this.sessionService.setTheme(this.theme);
		this.changeTheme.emit(this.theme);
	}

	public updateUsername() {
		this.sessionService.setFirstname(this.username);
	}

	public makeMaj() {

		this.utilService.checkMaj(true).then((response) => {

			if(response) {
				this.updateMajStatus.emit();
			} else {
				this.text = "Il n'y a pas de nouvelle mise à jour disponible";
			}
		});
	}

	private getTheme() {

		if(this.sessionService.themeExists()) {
			this.theme = this.sessionService.getTheme();
		}
	}
}
