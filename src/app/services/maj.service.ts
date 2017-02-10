import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from "rxjs/Observable";

@Injectable()

export class MajService {
	apiUrl: any;

	constructor(public http: Http) {
		this.apiUrl = "http://localhost/medoc/serveur.php?function=getMedocsVersion";
	}

	public getLastVersion() : Observable<Response> {
		var url = this.apiUrl;
		return this.http.get(url);
	}
}
