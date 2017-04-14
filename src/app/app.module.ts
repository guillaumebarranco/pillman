/*****************/
/* IONIC MODULES */
/*****************/

import { IonicApp, IonicModule } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';

/*****************/
/*   NG MODULES  */
/*****************/

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
// import { IonicApp, IonicModule } from 'ionic-angular';

/*****************/
/*  EXT MODULES  */
/*****************/

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
// import { Typeahead } from 'ng2-typeahead';
import { UiSwitchModule } from 'angular2-ui-switch';

import { AppComponent }   from './app.component';

/*****************/
/*   COMPONENTS  */
/*****************/

import { RecentPage } from './components/recent/recent.component';
import { OptionsPage } from './components/options/options.component';
import { HomePage } from './components/home/home.component';

// import { SlidesComponent } from './components/slides.component';
import { SlidesComponent } from './components/fakeSlides.component';
import { MenuComponent } from './components/utils/menu.component';
import { FilterComponent } from './components/filter.component';
import { TypesearchComponent } from './components/filters/typesearch.component';

import { PillmanComponent } from './components/pillman.component';

import { SearchComponent } from './components/home/search.component';
import { AftersearchComponent } from './components/home/aftersearch.component';
import { AutocompleteComponent } from './components/home/autocomplete.component';
import { CardComponent } from './components/home/card.component';

import { MajComponent } from './components/maj/maj.component';

/*****************/
/*     CONFIG    */
/*****************/

const firebaseConfig = {
    apiKey: "AIzaSyCVAdp4lUwOC7-jlGOOwGh1-iUvlvT72kE",
    authDomain: "miarobot-b5732.firebaseapp.com",
    databaseURL: "https://miarobot-b5732.firebaseio.com",
    storageBucket: "miarobot-b5732.appspot.com",
    messagingSenderId: "1045618538550"
};

const modules = [
    IonicModule.forRoot(AppComponent),
    BrowserModule,
    HttpModule,
    UiSwitchModule,
    Ng2AutoCompleteModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot()
];

const components = [
    AppComponent,
    RecentPage,
    OptionsPage,
    HomePage,
    SlidesComponent,
    MenuComponent,
    PillmanComponent,
    FilterComponent,
    TypesearchComponent,
    SearchComponent,
    AftersearchComponent,
    AutocompleteComponent,
    CardComponent,
    MajComponent
];

const providers = [
];

@NgModule({
    imports: modules,
    declarations: components,
    bootstrap: [IonicApp],
    providers: providers
})

export class AppModule { }
