/* tslint:disable:no-unused-variable */

import {async, TestBed} from '@angular/core/testing';

import {BxSpinnerComponent} from './spinner.component';

describe('BxSpinnerComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BxSpinnerComponent],
        });
        TestBed.compileComponents();
    });

    it('should create the bx-spinner', async(() => {
           const fixture = TestBed.createComponent(BxSpinnerComponent);
           const app = fixture.debugElement.componentInstance;
           expect(app).toBeTruthy();
       }));
});
