import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from "rxjs/Observable";

@Injectable()

export class ApiService {
	baseUrl : string = "";

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

	public getMedocs(limit = 150) : Observable<Response> {
		// return this.makeApiCall("?function=getMedocs&limit=100");
		return this.http.get("http://92.222.34.194:8181/all/"+limit);
	}

	public getLastVersion() : Observable<Response> {
		// return this.makeApiCall("?function=getMedocsVersion");
		return this.http.get("http://92.222.34.194:8181/version");

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
}
