import { Component } from '@angular/core';

@Component({
	selector: 'pillman',
	template: `

		<!--<div>Hello, I'm Pillman !</div>-->
		<img src="./media/img/pillman.svg" width="350" />
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

	constructor() {
	}
}
