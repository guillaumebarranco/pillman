import { Component, Input } from '@angular/core';

@Component({
	selector: 'autocomplete-element',
	templateUrl: './autocomplete.html'
})

export class AutocompleteComponent {
	@Input() elements;
	@Input() medoc;

	constructor() {}
}
