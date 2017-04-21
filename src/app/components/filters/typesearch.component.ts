import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'filter-typesearch',
	template: `
		<!--<select [(ngModel)]="searchType" (ngModelChange)="updateSearchType()">
			<option value="name">Par Nom</option>
			<option value="dci">Par DCI</option>
		</select>-->

		<ui-switch [(ngModel)]="enabled" (ngModelChange)="updateSearchType()"></ui-switch>

		<div *ngIf="enabled">Par Denomination</div>
		<div *ngIf="!enabled">Par Nom</div>
	`,
	styles: [`
		
		text-align: center;
	`]
})

export class TypesearchComponent {
	@Input() searchType;
	@Output() changeSearchType = new EventEmitter();
	enabled: boolean = true;

	constructor() {}

	updateSearchType() {
		this.searchType = this.enabled ? "dci": "name";
		this.changeSearchType.emit(this.searchType);
	}
}
