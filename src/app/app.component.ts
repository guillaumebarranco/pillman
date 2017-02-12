import { Component } from '@angular/core';

import { ApiService } from './services/api.service';

import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

@Component({
    selector: 'pillman',
    template: `
        <ion-content>
            <maj-element *ngIf="majToDo"></maj-element>
            <my-menu *ngIf="!majToDo" class="{{theme}}" [currentPage]="currentPage" (pageChange) = pageChange($event)></my-menu>
            <!--<pillman-element></pillman-element>-->

            <page-home *ngIf="!majToDo" class="page {{theme}}" [hidden]="handlePage('home')" [medoc]="medoc"></page-home>
            <page-recent *ngIf="!majToDo" class="page {{theme}}" [hidden]="handlePage('recent')" [medoc]="medoc" (medocChange) = medocChange($event)></page-recent>
            <page-options *ngIf="!majToDo" class="page {{theme}}" [hidden]="handlePage('options')" [theme]="theme" (changeTheme) = changeTheme($event)></page-options>
        </ion-content>
    `,
    styles: [`
        .default-theme {
            background-color: #F26F70;
            color: #fff;
        }

        .dark-theme {
            background-color: #000;
            color: #fff;
        }

        .tree-theme {
            background-color: forestgreen;
            color: #000;
        }
    `],
    providers: [ApiService]
})

export class AppComponent {
    medoc: any;
    currentPage: string = 'home';
    app: Object;
    theme: string = "default-theme";
    majToDo: boolean = false;

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
        this.app = {
            name: "Medocteur",
            description: "Cette application va vous permettre de retrouver les informations sur tous les médicaments, sans jamais quitter votre poche ni nécessiter de réseau"
        };

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
