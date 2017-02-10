import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'my-filter',
	template: `

		<div [className]="getMenuClass()">
			<filter-typesearch></filter-typesearch>
		</div>

		<nav class="navigation--button">
			<div [className]="navClass" (click)="toggleMenu()">
				<span class="first"></span>
				<span class="second"></span>
			</div>
		</nav>
	`
})

export class FilterComponent {
	navClass: string = "material--burger";
	menuShown: boolean = false;
	@Input() currentPage;
	@Output() pageChange = new EventEmitter();

	constructor() {

	}

	getMenuClass() {
		
		if(this.menuShown) return "menu-filter show";
		return "menu-filter hide";
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
