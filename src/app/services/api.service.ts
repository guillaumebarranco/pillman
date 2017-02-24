import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from "rxjs/Observable";

@Injectable()

export class ApiService {
	baseUrl: string;
	apiUrl: string = "";
	apiUrlMaj: string;

	constructor(public http: Http) {}

	ngOnInit() {
		this.init(() => {

		});
	}

	init(callback) {
		var env = "dev";

		this.getBaseUrl().subscribe((response) => {

			response = response.json();

			console.log('this.getBaseUrl()', response);

			this.baseUrl = response[env].apiUrl;

			this.apiUrl = this.baseUrl+"?function=getMedocs&limit=100";
			this.apiUrlMaj = this.baseUrl+"?function=getMedocsVersion";

			if(callback) callback();
		});
	}

	public makeApiCall(url) : Observable<Response> {

		if(this.apiUrl === "") {

			this.init(() => {
				console.log('this.apiUrl', this.apiUrl);
				return this.http.get(this.apiUrl+url);
			});
		}

		return this.http.get(this.apiUrl+url);
	}

	public getBaseUrl() : Observable<Response> {
		return this.http.get('assets/config/config.json');
	}

	public getAppDatas() : Observable<Response> {
		return this.http.get('assets/content/app.json');
	}

	public getAppLastMedocsVersion() : Observable<Response> {
		return this.http.get('assets/files/majVersion.json');
	}

	public getMedocs() : Observable<Response> {
		return this.makeApiCall("?function=getMedocs&limit=100");
	}

	public getLastVersion() : Observable<Response> {
		return this.makeApiCall("?function=getMedocsVersion");
	}
}
