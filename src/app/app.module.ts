// import { NgModule, ErrorHandler } from '@angular/core';
// import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
// import { MyApp } from './app.component';
// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';

// @NgModule({
//   declarations: [
//     MyApp,
//     AboutPage,
//     ContactPage,
//     HomePage,
//     TabsPage
//   ],
//   imports: [
//     IonicModule.forRoot(MyApp)
//   ],
//   bootstrap: [IonicApp],
//   entryComponents: [
//     MyApp,
//     AboutPage,
//     ContactPage,
//     HomePage,
//     TabsPage
//   ],
//   providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
// })
// export class AppModule {}

// IONIC

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';


/****************/
/*  NG MODULES  */
/****************/

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
// import { IonicApp, IonicModule } from 'ionic-angular';

/*****************/
/*  EXT MODULES  */
/*****************/

import { Ng2CompleterModule } from "ng2-completer";
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
import { MenuComponent } from './components/menu.component';
import { FilterComponent } from './components/filter.component';
import { TypesearchComponent } from './components/filters/typesearch.component';

import { PillmanComponent } from './components/pillman.component';

import { SearchComponent } from './components/home/search.component';
import { AftersearchComponent } from './components/home/aftersearch.component';
import { AutocompleteComponent } from './components/home/autocomplete.component';
import { CardComponent } from './components/home/card.component';

import { FormComponent } from './components/form.component';
import { MajComponent } from './components/maj.component';

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
    FormsModule,
    ReactiveFormsModule ,
    AngularFireModule.initializeApp(firebaseConfig)
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
    MajComponent,
    FormComponent
];

const providers = [
    FormBuilder
];

@NgModule({
    imports: modules,
    declarations: components,
    bootstrap: [IonicApp],
    providers: providers
})

export class AppModule { }
