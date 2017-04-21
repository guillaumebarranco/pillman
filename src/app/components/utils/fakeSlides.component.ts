import { Component } from '@angular/core';

@Component({
	selector: 'my-slides',
	template: `

		<div class="slides" *ngIf="showSlide">

			<div class="slide" style="background-color: green">
				<h2>Bienvenue sur Medocteur</h2>
			<div>

			<div class="slide" style="background-color: blue">
				<h2>Cette application va vous permettre de retrouver les informations sur tous les médicaments, sans jamais quitter votre poche ni nécessiter de réseau.</h2>
			<div>

			<div class="slide" style="background-color: red">
				<h2>Bonne utilisation !</h2>
				<button (click)="hideSlide()">End</button>
			<div>

		</div>
	`
})

export class SlidesComponent {
	showSlide: any;

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