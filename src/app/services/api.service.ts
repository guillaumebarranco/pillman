import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from "rxjs/Observable";

@Injectable()

export class ApiService {
	baseUrl: string;
	apiUrl: string;
	apiUrlMaj: string;

	constructor(public http: Http) {}

	ngOnInit() {
		var env = "dev";

		this.getBaseUrl().subscribe((response) => {

			response = response.json();

			this.baseUrl = response[env].apiUrl;

			this.apiUrl = this.baseUrl+"?function=getMedocs&limit=100";
			this.apiUrlMaj = this.baseUrl+"?function=getMedocsVersion";
		});
	}

	public getBaseUrl() : Observable<Response> {
		return this.http.get('assets/config/config.json');
	}

	public getMedocs() : Observable<Response> {
		return this.http.get(this.apiUrl);
	}

	public getLastVersion() : Observable<Response> {
		return this.http.get(this.apiUrlMaj);
	}

	public getAppDatas() : Observable<Response> {
		return this.http.get('assets/content/app.json');
	}
}
