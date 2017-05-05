import { Component, Input } from '@angular/core';

@Component({
	selector: 'bubble',
	template: `
		<div class="bubble_container">
			<p class="bubble">{{ text }}</p>
		</div>
	`,
	styles: [`
		.bubble_container {
			position: relative;
		}

		.bubble {
			position: absolute;
		    top: -281px;
		    left: 9px;
		    background-color: #ddd;
		    padding: 8px;
		    border-radius: 5px;
		}

		.bubble:before {
			background: #DDD;
		    border-bottom-left-radius: 40px 30px;
		    content: "";
		    height: 25px;
		    left: 115px;
		    position: absolute;
		    top: 93%;
		    width: 30px;
		}

		.bubble:after {
			background: #F26F70;
		    border-bottom-left-radius: 24px 24px;
		    content: "";
		    height: 28px;
		    left: 134px;
		    position: absolute;
		    top: 100%;
		    width: 24px;
		}
	`]
})

export class BubbleComponent {
	@Input() text;

	constructor() {
	}
}
