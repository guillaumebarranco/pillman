import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
	selector: 'weshlaform',
	template: `
		<input [(ngModel)]="toAdd" type="text" />
		<button (click)="addElement()">Add element</button>

		<ul class="frere">
			<li class="text" *ngFor="let item of items | async" (click)="deleteElement(item)">
				{{item.$value}}
			</li>
		</ul>

		<form class="frere" (ngSubmit)="register()" [formGroup]="user">

			<div>

				<label for="">Username 
					<input name="username" type="text" formControlName="username" />
				</label>

				<h1>{{user.username}}</h1>
			</div>

			<div>

				<label for="">Password 
					<input name="password" type="password" formControlName="password"/>
				</label>
			</div>

			<button>Register</button>

		</form>
	`,
	styles: [`
		.frere {
			color: black;
		}
	`]
})

export class FormComponent {
	user: FormGroup;
	items: FirebaseListObservable<any[]>;
	toAdd: any;
	afg: any;
	offset: any;

	constructor(fb: FormBuilder, af: AngularFire) {
		this.afg = af;

		this.items = af.database.list('/items');

		console.log(this.items);

		this.user = fb.group({
			username: fb.control(''),
			password: fb.control('')
		});
	}

	editElement() {

	}

	deleteElement(element) {
		console.log(element);

		const itemObservable = this.afg.database.object('/items/'+element.$key);
		itemObservable.remove();
	}

	addElement() {
		const itemObservable = this.afg.database.object('/items');

		this.offset = this.toAdd.toString();

		var object = {};
		object[this.offset] = this.toAdd;

		itemObservable.update(object);

		this.toAdd = "";
	}

	register() {
		console.log(this.user.value);
	}
}
