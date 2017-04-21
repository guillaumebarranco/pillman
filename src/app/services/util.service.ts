import { ApiService } from './api.service';

export class UtilService {

	constructor() {
		console.log('constructed');
	}

    checkMaj(apiService) {

    	return new Promise((resolve, reject) => {

			this.getAppLastMedocsVersion(apiService, (appVersionString) => {

	            const appVersion = appVersionString.json();

	            console.log('appVersion', appVersion);

	            apiService.getLastVersion().subscribe((apiVersionString) => {

	                const apiVersion = apiVersionString.json()[0];

	                localStorage.setItem('currentApiVersion', apiVersion);

	                console.log('apiVersion', apiVersion);

	                if(appVersion.lastVersion !== apiVersion.Version) {

	                    const appVersionParsed = this.getSplitedVersion(appVersion.lastVersion);
	                    const apiVersionParsed = this.getSplitedVersion(apiVersion.Version);
	                    const currentDate = new Date();

	                    if(
	                        (appVersionParsed.x > apiVersionParsed.x) ||
	                        (appVersionParsed.x <= apiVersionParsed.x && appVersionParsed.y > apiVersionParsed.y) ||
	                        (appVersionParsed.x <= apiVersionParsed.x && appVersionParsed.y <= apiVersionParsed.y
	                            && appVersionParsed.z > apiVersionParsed.z) ||
	                        (appVersion.wait && appVersion.waitTime > currentDate.getTime()) // If the remind date is after the current date
	                    ) {
	                        return resolve(false);
	                    }

	                    return resolve(true);
	                }

	                return resolve(false);
	            });
	        });
    	})
    }

    getAppLastMedocsVersion(apiService, callback) {


    	if(localStorage.getItem('lastMajVersion') !== null) {

    		callback({
    			lastVersion: localStorage.getItem('lastMajVersion')
    		});

    	} else {
    		callback({lastVersion: "0.0.0"})
    	}

        // apiService.getAppLastMedocsVersion().subscribe(response => {
        //     callback(response);
        // });
    }

	getSplitedVersion(stringVersion) {

        const version = stringVersion.split('.');

        if(typeof version[0] !== "undefined") {

            return {
                x: parseInt(version[0]),
                y: parseInt(version[1]),
                z: parseInt(version[2])
            };
        }

        return {x: 0, y:0, z: 0};
    }
}
