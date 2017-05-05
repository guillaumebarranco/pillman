import { ApiService } from './api.service';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';

@Injectable()

export class UtilService {

	constructor(public apiService: ApiService, public sessionService: SessionService) {
	}

    public checkMaj(asked = false) {

    	return new Promise((resolve, reject) => {

            // Then we get version from application
            this.delayedMajDecided((delayed) => {

                if(!delayed || asked) {

            		// Then we get version from application
        			this.getAppLastMedocsVersion((appVersion) => {

        	            this.apiService.getLastVersion().subscribe((apiVersionString) => {

        	                const apiVersion = apiVersionString.json()[0];

                            this.sessionService.setCurrentApiVersion(apiVersion);

        	                return resolve(this.isApiVersionNewer(appVersion, apiVersion));
        	            });
        	        });

                } else {
                    return resolve(false);
                }
        	});
        });
    }

    private delayedMajDecided(callback) {

        if(this.sessionService.getWaitForProposal() == 'true') {
            return callback(true);
        }

        return callback(false);
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

    public getLabos() {

        return [
            "ISOMED",
            "CRISTERS",
            "TEVA",
            "BIOGARAN",
            "MYLAN",
            "ALMUS",
            "RPG",
            "ARROW",
            "EVOLUGEN",
            "SANDOZ",
            "QUALIMED",
            "EG",
            "ZYDUS",
            "ZENTIVA",
            "RATIOPHARM",
            "RANBAXY",
            "SET",
            "PHR",
            "LAB",
            "PHARMA"
        ];
    }
}
