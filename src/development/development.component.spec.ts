/* tslint:disable:no-unused-variable */

import 'hammerjs';

import {TestBed} from '@angular/core/testing';
import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {BexioModule} from 'common/bexio.module';

import {DevelopmentComponent} from './development.component';

let fixture: any;

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DevelopmentComponent],
            imports: [BexioModule, MaterialModule, BrowserAnimationsModule]
        });
        TestBed.compileComponents();
    });

    it('should create the app', () => {
        fixture = TestBed.createComponent(DevelopmentComponent);
        const app = fixture.debugElement.componentInstance;  // this fixes error of type "Cannot
                                                             // read property 'unsubscribe' of
                                                             // undefined"
        fixture.detectChanges();
        expect(app).toBeTruthy();
        fixture.detectChanges();
    });
});
