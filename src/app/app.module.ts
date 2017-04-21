import { AppComponent }              from './main/app.component';

/********************/
/*   IONIC MODULES  */
/********************/

import { IonicApp, IonicModule }     from 'ionic-angular';
import { IonicStorageModule }        from '@ionic/storage';

/********************/
/*    NG2 MODULES   */
/********************/

import { NgModule }                  from '@angular/core';
import { BrowserModule }             from '@angular/platform-browser';
import { HttpModule }                from '@angular/http';

/********************/
/*    EXT MODULES   */
/********************/

import { Ng2AutoCompleteModule }     from 'ng2-auto-complete';
import { UiSwitchModule }            from 'angular2-ui-switch';

/********************/
/*    COMPONENTS    */
/********************/

import { RecentPage }                from './components/pages/recent/recent.component';
import { OptionsPage }               from './components/pages/options/options.component';
import { HomePage }                  from './components/pages/home/home.component';
import { MajPage }                   from './components/pages/maj/maj.component';

// import { SlidesComponent } from './components/slides.component';
import { SlidesComponent }           from './components/utils/fakeSlides.component';
import { MenuComponent }             from './components/utils/menu.component';
import { PillmanComponent }          from './components/utils/pillman.component';

import { TypesearchComponent }       from './components/elements/home/typesearch.component';
import { SearchComponent }           from './components/elements/home/search.component';
import { AftersearchComponent }      from './components/elements/home/aftersearch.component';
import { AutocompleteComponent }     from './components/elements/home/autocomplete.component';
import { CardComponent }             from './components/elements/home/card.component';


/********************/
/*      CONFIG      */
/********************/

const modules = [
    IonicModule.forRoot(AppComponent),
    BrowserModule,
    HttpModule,
    UiSwitchModule,
    Ng2AutoCompleteModule,
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
    TypesearchComponent,
    SearchComponent,
    AftersearchComponent,
    AutocompleteComponent,
    CardComponent,
    MajPage
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
