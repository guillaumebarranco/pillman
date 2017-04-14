import { Component } from '@angular/core';
import Medoc from './classes/medoc';

import { ApiService } from './services/api.service';
import { UtilService } from './services/util.service';

import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

@Component({
    selector: 'pillman',
    templateUrl: './app.html',
    providers: [ApiService, UtilService]
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

        constructor(platform: Platform, private apiService: ApiService, private utilService: UtilService) {

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

        this.utilService.checkMaj(this.apiService).then((response) => {
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
