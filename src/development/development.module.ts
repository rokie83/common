import 'hammerjs';

import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {BexioModule} from 'common/bexio.module';

import {DevelopmentComponent} from './development.component';

@NgModule({
    declarations: [DevelopmentComponent],
    imports: [
        BrowserModule, FormsModule, HttpModule, BexioModule, MaterialModule, BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [DevelopmentComponent]
})

export class DevelopmentModule {
}
