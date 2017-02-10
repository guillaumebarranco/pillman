import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MedocService } from './../../services/medoc.service';

@Component({
	selector: 'search-element',
	templateUrl: './search.html'
})

export class SearchComponent {
	@Input() researchDone;
	@Output() changeResearch = new EventEmitter();

	private search: string;

	constructor() {}

	doResearch() {
		this.researchDone = false;
		this.changeResearch.emit(this.search);
	}

	updateSearch(data) {
		this.search = data;
	}
}
