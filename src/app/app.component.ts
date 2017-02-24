import { Component } from '@angular/core';

import { ApiService } from './services/api.service';

import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

@Component({
    selector: 'pillman',
    templateUrl: './app.html',
    // styleUrls: ['./app.scss'],
    providers: [ApiService]
})

export class AppComponent {
    medoc           : any;
    currentPage     : string     = 'home';
    theme           : string     = "default-theme";
    majToDo         : boolean    = false;
    app             : Object;

    constructor(platform: Platform, private apiService: ApiService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    ngOnInit() {

        console.log('before check maj');

        this.checkMaj();

        this.medoc = {};
        this.apiService.getAppDatas().subscribe((response) => {
            console.log(response);
            this.app = response;
        });

        this.theme = this.getTheme();
    }

    checkMaj() {

        // this.getLastMedocsVersion((version) => {

        //     this.apiService.getLastVersion().subscribe(response => {

                this.majToDo = true;

                // if(version.version !== response.json().version) {
                //     this.majToDo = true;
                // }
        //     });
        // });
    }

    getLastMedocsVersion(callback) {
        // TODO read in assets/files/version.json with ionic

        callback({version: "0.0.0"});
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
