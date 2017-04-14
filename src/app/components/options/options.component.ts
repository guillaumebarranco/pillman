import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'page-options',
	templateUrl: './options.html'
})

export class OptionsPage {
	@Input() theme;
	@Output() changeTheme = new EventEmitter();
	@Output() updateMajStatus = new EventEmitter();

	constructor() {}

	public updateTheme() {
		localStorage.setItem("theme", this.theme);
		this.changeTheme.emit(this.theme);
	}

	public makeMaj() {
		this.updateMajStatus.emit();
	}
}
