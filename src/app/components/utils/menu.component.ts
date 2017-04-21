import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'my-menu',
	template: `
		<div [className]="getMenuClass()">
			<div *ngFor="let element of elements" (click)="changePage(element)">
				{{element}}
			</div>
		</div>
		<nav class="navigation--button">
			<div [className]="navClass" (click)="toggleMenu()">
				<span></span>
			</div>
		</nav>
	`
})

export class MenuComponent {
	elements: any;
	navClass: string = "material--burger";
	menuShown: boolean = false;
	@Input() currentPage;
	@Output() pageChange = new EventEmitter();

	constructor() {

		this.elements = [
			"home",
			"options",
			"recent"
		];
	}

	getMenuClass() {
		
		if(this.menuShown) return "menu show_menu";
		return "menu hide_menu";
	}

	toggleMenu() {

		if(this.navClass === "material--burger") {
			this.menuShown = true;
			this.navClass = "material--burger material--arrow";

		} else {
			this.menuShown = false;
			this.navClass = "material--burger";
		}
	}

	changePage(page) {
		this.setCurrentPage(page);
		this.menuShown = false;
		this.toggleMenu();
		this.pageChange.emit(page);
	}

	getNavClass() {
		return this.navClass;
	}

	setCurrentPage(page) {
		this.currentPage = page;
	}
}