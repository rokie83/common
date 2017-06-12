import {AbstractControl, FormGroup} from '@angular/forms';

export type ariaLiveValue = 'assertive' | 'off';

export type ariaInvalidFn = (controlName: string) => boolean;

export type ariaLiveFn = (controlName: string, error: string) => ariaLiveValue;

export type formAriaInvalidFn = (controlNames: string[], error: string) => boolean;

export type formAriaLiveFn = (controlNames: string[], error: string) => ariaLiveValue;

const controlInvalid = (control: AbstractControl, error: string = null, {touchedCondition} = {
    touchedCondition: true
}) => (error ? control.hasError(error) : control.invalid) && (!touchedCondition || control.touched);

const formInvalidAndTouched =
    (form: AbstractControl, controlNames: string[], error: string = null) =>
        (error ? form.hasError(error) : form.invalid) &&
    controlNames.some(controlName => form.get(controlName).touched);

export const makeAriaInvalidFn = (form: FormGroup, options?: any): ariaInvalidFn =>
    (controlName: string): boolean => controlInvalid(form.get(controlName), null, options);

export const makeAriaLiveFn = (form: FormGroup, options?: any): ariaLiveFn =>
    (controlName: string, error: string): ariaLiveValue =>
        controlInvalid(form.get(controlName), error, options) ? 'assertive' : 'off';

export const makeFormAriaInvalidFn = (form: FormGroup): formAriaInvalidFn =>
    (controlNames: string[], error: string): boolean =>
        formInvalidAndTouched(form, controlNames, error);

export const makeFormAriaLiveFn = (form: FormGroup): formAriaLiveFn =>
    (controlNames: string[], error: string): ariaLiveValue =>
        formInvalidAndTouched(form, controlNames, error) ? 'assertive' : 'off';
