import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './../../services/api.service';

@Component({
	selector: 'aftersearch-element',
	templateUrl: './aftersearch.html',
	providers: [ApiService],
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

	constructor(private apiService: ApiService) {

		var interval = setInterval(() => {

			if(!this.researchDone && this.matchDone) {
				this.matchDone = false;
				this.launchMatch();
			}

		}, 500);
	}

	updateResearchDone(element) {
		this.changeResearchDone.emit(element);
		this.found = true;
		this.propos = [];
	}

	launchMatch() {

		var which = this.search.substr(0,1).toLowerCase();

		this.apiService.getMedocs().subscribe(medocs => {
			// this.apiService.getMedocs(which).subscribe(medocs => {
			this.elements = medocs.json();

			for(var element of this.elements) {

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
