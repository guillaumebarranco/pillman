export class UtilService {

	constructor() {
	}

    public checkMaj(apiService) {

    	return new Promise((resolve, reject) => {

    		// First we get version from application
			this.getAppLastMedocsVersion((appVersion) => {

	            apiService.getLastVersion().subscribe((apiVersionString) => {

	                const apiVersion = apiVersionString.json()[0];

	                localStorage.setItem('currentApiVersion', apiVersion);

	                return resolve(this.isApiVersionNewer(appVersion, apiVersion));
	            });
	        });
    	})
    }

    private isApiVersionNewer(appVersion, apiVersion) {

    	if(appVersion.lastVersion !== apiVersion.Version) {

            const appVersionParsed = this.getSplitedVersion(appVersion.lastVersion);
            const apiVersionParsed = this.getSplitedVersion(apiVersion.Version);
            const currentDate = new Date();

            if(
                (appVersionParsed.x > apiVersionParsed.x) || // If api.x newer than app.x
                (appVersionParsed.x <= apiVersionParsed.x && appVersionParsed.y > apiVersionParsed.y) ||
                (appVersionParsed.x <= apiVersionParsed.x && appVersionParsed.y <= apiVersionParsed.y
                    && appVersionParsed.z > apiVersionParsed.z) ||
                (appVersion.wait && appVersion.waitTime > currentDate.getTime()) // If the remind date is after the current date
            ) {
                return false;
            }

            return true;
        }

        return false;
    }

    public getAppLastMedocsVersion(callback) {

    	if(localStorage.getItem('lastMajVersion') !== null) {

    		callback({
    			lastVersion: localStorage.getItem('lastMajVersion')
    		});

    	} else {
    		localStorage.setItem('lastMajVersion', "0.0.0");
    		callback({lastVersion: "0.0.0"})
    	}
    }

	public getSplitedVersion(stringVersion) {

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
