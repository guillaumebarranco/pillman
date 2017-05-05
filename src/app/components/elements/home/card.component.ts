import { Component, Input } from '@angular/core';

@Component({
	selector: 'card-element',
	templateUrl: './card.html'
})

export class CardComponent {
	@Input() searchType;
	@Input() medoc;

	showAllEffects: any = false;

	constructor() {

	}

	medocExists() {
		return this.medoc !== [] && typeof this.medoc.name !== "undefined";
	}

	// Return side_effects of medicament with string truncated
	public getShortEffects(effects) {

		if(typeof effects !== "undefined") {

			var cut = effects.indexOf('.') + 1;

			let shortEffects = effects.substr(0, cut);
			return shortEffects + "..";
		}

		return "";
	}

	public seeAllDetails() {
		this.showAllEffects = true;
	}

	public hideAllDetails() {
		this.showAllEffects = false;
	}	
}
