import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { DBService } from '../../../services/db.service';

@Component({
	selector: 'aftersearch-element',
	templateUrl: './aftersearch.html',
	providers: [ApiService, DBService],
	styles: [`
		
		li {
			margin-top: 10px;
		}
	`]
})

export class AftersearchComponent {
	@Input() search;
	@Input() elements;
	@Input() researchDone;
	@Output() changeResearchDone = new EventEmitter();

	matchDone = true;
	found = true;

	propos: any = [];

	constructor(private apiService: ApiService, private dbService: DBService) {

		setInterval(() => {

			if(!this.researchDone && this.matchDone) {
				this.matchDone = false;
				this.launchMatch();
			}

		}, 500);
	}

	private reinitResearch(element) {
		this.researchDone = element;
		this.found = false;
		this.propos = [];
		this.launchMatch();
	}

	private updateResearchDone(element) {
		this.changeResearchDone.emit(element);
		this.found = true;
		this.propos = [];
	}

	private goBackHome() {
		this.changeResearchDone.emit({});
		this.found = true;
		this.propos = [];
	}

	private launchMatch() {

		const which = this.search.substr(0,1).toLowerCase();

		this.dbService.searchMedoc(this.search).then(medocs => {
			this.elements = medocs;

		// this.apiService.getMedocs(1000).subscribe(medocs => {
		// 	this.elements = medocs.json();

			for(const element of this.elements) {

				if(this.propos.length >= 10) break;

				if(this.search.length > 1) {

					if(element.name.substr(1,1).toLowerCase() === this.search.substr(1,1).toLowerCase()) {
						this.propos.push(element);
					}

				} else {
					this.propos.push(element);
				}
			}

			if(this.propos.length === 0) {

				this.found = false;

				for (var i = 0; i < 10; ++i) {

					this.propos.push(this.elements[i]);
				}

			} else {
				this.found = true;
			}

			this.matchDone = true;
			this.researchDone = true;
		});
	}
}
