import { Component } from '@angular/core';
import Medoc from '../classes/medoc';

import { ApiService } from '../services/api.service';
import { UtilService } from '../services/util.service';
import { SessionService } from '../services/session.service';

import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

@Component({
    selector: 'pillman',
    templateUrl: './app.html',
    providers: [ApiService, UtilService, SessionService]
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

        constructor(platform: Platform, private apiService: ApiService, private utilService: UtilService, private sessionService: SessionService) {

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

    checkMaj() {

        this.utilService.checkMaj().then((response) => {
            this.majToDo = response ? true: false;
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
            console.log('this medoc', this.medoc);
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

        public getCurrentTitle(page) {

            let title = "";

            switch (page) {

                case "home":
                    title = "Accueil";
                break;

                case "options":
                    title = "Paramètres";
                break;

                case "recent":
                    title = "Recherches récentes";
                break;
                
                default: break;
            }

            return title;
        }

        public setCurrentPage(page) {
            this.currentPage = page;
        }

        public getTheme() {

            if(this.sessionService.themeExists()) {
                return this.sessionService.getTheme();
            }

            return "default-theme";
        }
}
