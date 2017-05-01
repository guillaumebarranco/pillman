import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SessionService } from '../../../services/session.service';

@Component({
	selector: 'page-recent',
	templateUrl: './recent.html',
	styles: [`

		.recentResearch {
			margin-top: 10px;
		}
	`],
	providers: [SessionService]
})

export class RecentPage {

	@Input() medoc;
	@Output() medocChange = new EventEmitter();

	recentResearch: any;
	nbResearchsShow: number = 10;

	constructor(private sessionService: SessionService) {}

	ngOnInit() {
		this.getRecentResearch();
	}

	changeResearch(medoc) {
		this.medoc = medoc;
		this.medocChange.emit(medoc);
	}

	goBackHome() {
		this.medocChange.emit({});
	}

	public getRecentResearch() {

		this.recentResearch = [];

		if(this.sessionService.recentResearchExists()) {
			this.recentResearch = this.sessionService.getRecentResearch();
		}
	}
}
