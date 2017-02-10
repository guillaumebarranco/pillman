import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from "rxjs/Observable";

@Injectable()

export class MedocService {
	apiUrl: any;

	constructor(public http: Http) {
		// this.apiUrl = "http://localhost/medoc/serveur.php?function=getMedocs&limit=10";
		// this.apiUrl = './../assets/files/min/';
		this.apiUrl = "http://92.222.34.194/medoc/serveur.php?function=getMedocs&limit=15000";
	}

	public getMedocs(which) : Observable<Response> {

		// var url = this.apiUrl+which.toUpperCase()+'.json';
		var url = this.apiUrl;
		console.log(url);
		return this.http.get(url);
	}
}
