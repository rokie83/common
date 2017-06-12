import {FormControl, FormGroup} from '@angular/forms';

import {ariaInvalidFn, ariaLiveFn, formAriaInvalidFn, makeAriaInvalidFn, makeAriaLiveFn, makeFormAriaInvalidFn} from './aria';

describe('aria', () => {

    it('makeAriaInvalidFn', () => {
        const form = new FormGroup({
            control_one: new FormControl(null),
            control_two: new FormControl(null),
        });
        form.get('control_one').setErrors({someError: 'error on control one'});

        const resultFn: ariaInvalidFn = makeAriaInvalidFn(form);
        const resultFnTouchedCondition: ariaInvalidFn =
            makeAriaInvalidFn(form, {touchedCondition: false});

        expect(resultFn('control_one')).toBe(false);
        expect(resultFnTouchedCondition('control_one')).toBe(true);

        form.get('control_one').markAsTouched();

        expect(resultFn('control_one')).toBe(true);
        expect(resultFnTouchedCondition('control_one')).toBe(true);
    });

    it('makeAriaLiveFn', () => {
        const form = new FormGroup({
            control_one: new FormControl(null),
            control_two: new FormControl(null),
        });
        form.get('control_one').setErrors({someError: 'error on control one'});

        const resultFn: ariaLiveFn = makeAriaLiveFn(form);
        const resultFnTouchedCondition: ariaLiveFn =
            makeAriaLiveFn(form, {touchedCondition: false});

        expect(resultFn('control_one', 'someError')).toBe('off');
        expect(resultFnTouchedCondition('control_one', 'someError')).toBe('assertive');

        form.get('control_one').markAsTouched();

        expect(resultFn('control_one', 'someError')).toBe('assertive');
        expect(resultFnTouchedCondition('control_one', 'someError')).toBe('assertive');
    });

    it('makeFormAriaInvalidFn all touched', () => {
        const form = new FormGroup({
            debitAccountId: new FormControl(null),
            creditAccountId: new FormControl(null),
        });
        form.setErrors({'errorsAreBad': true});
        form.get('debitAccountId').markAsTouched();
        form.get('creditAccountId').markAsTouched();

        const resultFn: formAriaInvalidFn = makeFormAriaInvalidFn(form);
        expect(resultFn).not.toBeNull();
        expect(resultFn.call(form, ['debitAccountId', 'creditAccountId'], 'errorsAreBad'))
            .toBe(true);

    });

    it('makeFormAriaInvalidFn first control touched', () => {
        const form = new FormGroup({
            debitAccountId: new FormControl(null),
            creditAccountId: new FormControl(null),
        });
        form.setErrors({'errorsAreBad': true});
        form.get('debitAccountId').markAsTouched();

        const resultFn: formAriaInvalidFn = makeFormAriaInvalidFn(form);
        expect(resultFn).not.toBeNull();
        expect(resultFn.call(form, ['debitAccountId', 'creditAccountId'], 'errorsAreBad'))
            .toBe(true);

    });

    it('makeFormAriaInvalidFn last control touched', () => {
        const form = new FormGroup({
            debitAccountId: new FormControl(null),
            creditAccountId: new FormControl(null),
        });
        form.setErrors({'errorsAreBad': true});
        form.get('creditAccountId').markAsTouched();

        const resultFn: formAriaInvalidFn = makeFormAriaInvalidFn(form);
        expect(resultFn).not.toBeNull();
        expect(resultFn.call(form, ['debitAccountId', 'creditAccountId'], 'errorsAreBad'))
            .toBe(true);

    });
});
