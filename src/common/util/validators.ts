import {AbstractControl, FormArray, ValidatorFn} from '@angular/forms';
import * as isEmail from 'validator/lib/isEmail';

import {identityTrue, isUnique} from './filters';


/**
 * @whatItDoes Provides a set of validators used by form controls.
 *
 * A validator is a function that processes a {\@link FormControl} or collection of
 * controls and returns a map of errors. A null map means that validation has passed.
 *
 * ### Example
 *
 * ```typescript
 * var loginControl = new FormControl("", Validators.required)
 * ```
 *
 */
export class Validators {
    private static delta: number = 0.000001;

    /**
     * Validator that requires controls to have a value larger than provided.
     * @param {?} min
     * @return {?}
     */
    public static largerThan(min: number): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const value: number = control.value;
            return value > min ? null : {largerthan: {required: min, value: value}};
        };
    }

    /**
     * Validator that requires controls to have a value smaller than provided.
     * @param {?} max
     * @return {?}
     */
    public static smallerThan(max: number): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const value: number = control.value;
            // !value as null check for number
            return !value || value < max ? null : {smallerthan: {required: max, value: value}};
        };
    }

    public static notEqual(validationValue: number, delta: number = this.delta): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const value: number = control.value;
            return Math.abs(value - validationValue) >= delta ?
                null :
                {notEqual: {required: validationValue, value: value}};
        };
    }

    public static fieldsEqual(a: string, b: string): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const valueA = control.get(a).value;
            const valueB = control.get(b).value;
            return valueA === valueB ? null : {fieldsequal: {value: valueA, compared: valueB}};
        };
    }

    public static fieldsNotEqual(a: string, b: string): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const valueA = control.get(a).value;
            const valueB = control.get(b).value;
            return valueA !== valueB || !valueA ? null : {fieldsnotequal: {value: valueA}};
        };
    }

    public static xor(a: string, b: string): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const valueA = control.get(a).value;
            const valueB = control.get(b).value;
            return !!valueA !== !!valueB ? null : {xor: {value: valueA, compared: valueB}};
        };
    }

    public static uniqueArray(key: string): ValidatorFn {
        return (controlArray: AbstractControl): {[key: string]: any} => {
            const items = (<FormArray>controlArray)
                              .controls.map(control => control.get(key).value)
                              .filter(identityTrue);
            return isUnique(items) ? null : {uniquearray: {value: key}};
        };
    }

    public static email(control: AbstractControl): {[key: string]: any} {
        const value = control.value;
        return !value || isEmail(value) ? null : {email: {value}};
    }

    public static multiUniqueArray(...keys: string[]): ValidatorFn {
        return (controlArray: AbstractControl): {[keys: string]: any} => {
            const items =
                (<FormArray>controlArray)
                    .controls
                    .map(control => keys.map(key => control.get(key).value).filter(identityTrue))
                    .reduce((prev, current) => prev.concat(current), []);
            return isUnique(items) ? null : {multiuniquearray: {value: keys}};
        };
    }

    public static firstItemUnique(...keys: string[]): ValidatorFn {
        return (controlArray: AbstractControl): {[keys: string]: any} => {
            const first = keys.map(key => (<FormArray>controlArray).at(0).get(key).value)
                              .filter(identityTrue);
            const rest =
                (<FormArray>controlArray)
                    .controls.filter((_, index) => index > 0)
                    .map(control => keys.map(key => control.get(key).value).filter(identityTrue));
            let index = 0;
            return rest.every((values, i) => {
                index = i + 1;
                return values.every(value => first.indexOf(value) === -1);
            }) ?
                null :
                {firstitemunique: {value: keys, index}};
        };
    }

    public static isInArray(options: any[]): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const value: any = control.value;
            return !value || options.some(option => option.id === value) ?
                null :
                {isInArray: {options, value}};
        };
    }
}
