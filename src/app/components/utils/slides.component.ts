import { Component, Input } from '@angular/core';

@Component({
	selector: 'my-slides',
	template: `

		<ion-slides pager *ngIf="showSlide">

			<ion-slide style="background-color: green">
				<h2>Bienvenue sur {{app.name}}</h2>
			</ion-slide>

			<ion-slide style="background-color: blue">
				<h2>{{app.description}}</h2>
			</ion-slide>

			<ion-slide style="background-color: red">
				<h2>Bonne utilisation !</h2>
				<button (click)="hideSlide()">End</button>
			</ion-slide>

		</ion-slides>
	`
})

export class SlidesComponent {
	showSlide: any;
	@Input() app;

	constructor() {
		this.showSlide = true;
		this.handleSlide();
	}

	handleSlide() {

		if(localStorage.getItem("slides") !== null) {
			this.showSlide = false;
		}
	}

	hideSlide() {
		this.showSlide = false;
		localStorage.setItem('slides', "done");
	}	
}
