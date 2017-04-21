import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'page-recent',
	templateUrl: './recent.html',
	styles: [`

		.recentResearch {
			margin-top: 10px;
		}
	`]
})

export class RecentPage {

	@Input() medoc;
	@Output() medocChange = new EventEmitter();

	recentResearch: any;
	nbResearchsShow: number = 10;

	constructor() {}

	ngOnInit() {
		this.getRecentResearch();
	}

	changeResearch(medoc) {
		console.log('medoc', medoc);
		this.medoc = medoc;
		this.medocChange.emit(medoc);
	}

	goBackHome() {
		this.medocChange.emit({});
	}

	public getRecentResearch() {

		this.recentResearch = [];

		if(localStorage.getItem("recentResearch") !== null) {
			this.recentResearch = JSON.parse(localStorage.getItem("recentResearch"));
		}
	}
}
