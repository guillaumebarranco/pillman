import { Component, Input } from '@angular/core';

@Component({
	selector: 'pillman-svg',
	template: `

		<img src="./assets/img/pillman.svg" width="350" />
		<bubble [text]="text"></bubble>
	`,
	styles: [`
		img {
			margin: 0 auto;
		    width: 80%;
		    display: block;
		}
	`]
})

export class PillmanComponent {
	@Input() text;

	constructor() {
	}
}
