import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from "rxjs/Observable";

@Injectable()

export class ApiService {
	baseUrl: string;
	apiUrl: string;
	apiUrlMaj: string;

	constructor(public http: Http) {
		this.baseUrl = "http://92.222.34.194/medoc/serveur.php";

		this.apiUrl = this.baseUrl+"?function=getMedocs&limit=100";
		this.apiUrlMaj = this.baseUrl+"?function=getMedocsVersion";
	}

	public getMedocs() : Observable<Response> {
		return this.http.get(this.apiUrl);
	}

	public getLastVersion() : Observable<Response> {
		return this.http.get(this.apiUrlMaj);
	}
}
