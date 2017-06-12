import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {BexioModule} from 'common/bexio.module';

import {DevelopmentComponent} from './development.component';

@NgModule({
    declarations: [DevelopmentComponent],
    imports: [
        BrowserModule, FormsModule, HttpModule, BexioModule
    ],
    providers: [],
    bootstrap: [DevelopmentComponent]
})

export class DevelopmentModule {
}
