import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'maj-element',
	template: `
		<div>Une mise à jour est disponible</div>
	`,
	styles: [`
		
		div {
			color: black;
		}
	`]
})

export class MajComponent {

	constructor() {}
}
