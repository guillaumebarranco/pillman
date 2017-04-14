import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from "rxjs/Observable";

@Injectable()

export class ApiService {
	baseUrl 		: string 		= "";

	constructor(public http: Http) {}

	ngOnInit() {
		this.init(() => {
		});
	}

	init(callback) {
		var env = "dev";

		this.getBaseUrl().subscribe((response) => {

			response = response.json();
			this.baseUrl = response[env].apiUrl;

			if(callback) callback();
		});
	}

	/****************/
	/*     API      */
	/****************/

	// public makeApiCall(url) : Observable<Response> {

	// 	if(this.baseUrl === "") {

	// 		this.init(() => {
	// 			// TODO
	// 			console.log('this.baseUrl', this.baseUrl+url);
	// 			return this.http.get("http://92.222.34.194/medoc/serveur.php"+url);
	// 		});
	// 	}

	// 	return this.http.get("http://92.222.34.194/medoc/serveur.php"+url);
	// }

	public getMedocs() : Observable<Response> {
		// return this.makeApiCall("?function=getMedocs&limit=100");
		return this.http.get("http://ba4dfaab.ngrok.io/all/100");
	}

	public getLastVersion() : Observable<Response> {
		// return this.makeApiCall("?function=getMedocsVersion");
		return this.http.get("http://ba4dfaab.ngrok.io/version");

	}

	/****************/
	/* LOCAL ASSETS */
	/****************/

	public getBaseUrl() : Observable<Response> {
		return this.http.get('assets/config/config.json');
	}

	public getAppDatas() : Observable<Response> {
		return this.http.get('assets/content/app.json');
	}

	public getAppLastMedocsVersion() : Observable<Response> {
		return this.http.get('assets/files/majVersion.json');
	}

	
}
