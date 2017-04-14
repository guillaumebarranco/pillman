import { Component } from '@angular/core';
import Medoc from './classes/medoc';

import { ApiService } from './services/api.service';

import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

@Component({
    selector: 'pillman',
    templateUrl: './app.html',
    providers: [ApiService]
})

export class AppComponent {
    medoc           : Medoc;
    currentPage     : string     = 'home';
    theme           : string     = "default-theme";
    majToDo         : boolean    = false;
    app             : Object;

    /************************/
    /*       APP INIT       */
    /************************/

        constructor(platform: Platform, private apiService: ApiService) {

            platform.ready().then(() => {
                StatusBar.styleDefault();
                Splashscreen.hide();
            });
        }

        ngOnInit() {

            console.log('before check maj');

            this.checkMaj();

            this.medoc = {
                name: ''
            };

            this.apiService.getAppDatas().subscribe((response) => {
                this.app = response.json();
            });

            this.theme = this.getTheme();
        }

    getSplitedVersion(stringVersion) {

        const version = stringVersion.split('.');

        return {
            x: parseInt(version[0]),
            y: parseInt(version[1]),
            z: parseInt(version[2])
        };
    }

    checkMaj() {

        this.getAppLastMedocsVersion((appVersionString) => {

            const appVersion = appVersionString.json();

            console.log('appVersion', appVersion);

            this.apiService.getLastVersion().subscribe((apiVersionString) => {

                const apiVersion = apiVersionString.json()[0];

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
                        return;
                    }

                    this.majToDo = true;
                    return;
                }
            });
        });
    }

    getAppLastMedocsVersion(callback) {
        this.apiService.getAppLastMedocsVersion().subscribe(response => {
            callback(response);
        });
    }

    /************************/
    /*  EVENTS FROM OTHERS  */
    /************************/

        // Received by Options Component
        changeTheme(theme) {
            this.theme = theme;
        }

        // Received by Recent Component
        medocChange(medoc) {
            this.medoc = medoc;
            this.currentPage = "home";
        }

        // Received by Menu Component
        pageChange(page) {
            this.setCurrentPage(page);
        }

    /************************/
    /*        EVENTS        */
    /************************/

        handlePage(page) {
            return this.currentPage !== page;
        }

        updateMajStatus() {
            this.majToDo = !this.majToDo; 
        }

    /************************/
    /*  GETTERS && SETTERS  */
    /************************/

        public getCurrentPage() {
            return this.currentPage;
        }

        public setCurrentPage(page) {
            this.currentPage = page;
        }

        public getTheme() {

            if(localStorage.getItem("theme") !== null) {
                return localStorage.getItem("theme");
            }

            return "default-theme";
        }
}
