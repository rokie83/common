import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {isUndefined} from 'util';

import {Validators} from './validators';

describe('Validators', () => {

    describe('larger than', () => {

        it('should error on empty string', () => {
            expect(Validators.largerThan(5)(new FormControl(''))).toEqual({
                largerthan: {required: 5, value: ''}
            });
        });

        it('should error on null', () => {
            expect(Validators.largerThan(5)(new FormControl(null))).toEqual({
                largerthan: {required: 5, value: null}
            });
        });

        it('should not error on larger than', () => {
            expect(Validators.largerThan(5)(new FormControl(6))).toBeNull();
        });

        it('should not error on larger than number string', () => {
            expect(Validators.largerThan(5)(new FormControl('6.2'))).toBeNull();
        });

        it('should error incorrect number string', () => {
            expect(Validators.largerThan(5)(new FormControl('6.2.2'))).toEqual({
                largerthan: {required: 5, value: '6.2.2'}
            });

            expect(Validators.largerThan(5)(new FormControl('3.2.2'))).toEqual({
                largerthan: {required: 5, value: '3.2.2'}
            });
        });

        it('should error on array', () => {
            expect(Validators.largerThan(5)(new FormControl([1, 2]))).toEqual({
                largerthan: {required: 5, value: [1, 2]}
            });
        });
    });

    describe('smaller than', () => {

        it('should not error on empty string', () => {
            expect(Validators.smallerThan(5)(new FormControl(''))).toBeNull();
        });

        it('should not error on null', () => {
            expect(Validators.smallerThan(5)(new FormControl(null))).toBeNull();
        });

        it('should error on equal than', () => {
            expect(Validators.smallerThan(5)(new FormControl(5))).toEqual({
                smallerthan: {required: 5, value: 5}
            });
        });

        it('should error on equal than number string', () => {
            expect(Validators.smallerThan(5)(new FormControl('5.0'))).toEqual({
                smallerthan: {required: 5, value: '5.0'}
            });
        });

        it('should not error on smaller than', () => {
            expect(Validators.smallerThan(5)(new FormControl(4))).toBeNull();
        });

        it('should not error on smaller than number string', () => {
            expect(Validators.smallerThan(5)(new FormControl('4.9'))).toBeNull();
        });

        it('should error incorrect number string', () => {
            expect(Validators.smallerThan(5)(new FormControl('4.2.2'))).toEqual({
                smallerthan: {required: 5, value: '4.2.2'}
            });

            expect(Validators.smallerThan(5)(new FormControl('3.2.2'))).toEqual({
                smallerthan: {required: 5, value: '3.2.2'}
            });
        });

        it('should error on array', () => {
            expect(Validators.smallerThan(5)(new FormControl([1, 2]))).toEqual({
                smallerthan: {required: 5, value: [1, 2]}
            });
        });
    });

    describe('not equal', () => {

        it('should error on equal value', () => {
            expect(Validators.notEqual(0)(new FormControl(0))).toEqual({
                notEqual: {required: 0, value: 0}
            });
        });

        it('should error equal value with default delta', () => {
            expect(Validators.notEqual(0)(new FormControl(0.0000001))).toEqual({
                notEqual: {required: 0, value: 0.0000001}
            });
        });

        it('should error equal value with default delta and other value than 0', () => {
            expect(Validators.notEqual(7)(new FormControl(7.0000001))).toEqual({
                notEqual: {required: 7, value: 7.0000001}
            });
        });

        it('should error equal value with custom delta', () => {
            expect(Validators.notEqual(0, 0.001)(new FormControl(0.0001))).toEqual({
                notEqual: {required: 0, value: 0.0001}
            });
        });

        it('should pass with default delta', () => {
            expect(Validators.notEqual(0)(new FormControl(0.000001))).toBeNull();
        });

        it('should pass with default delta and other value than 0', () => {
            expect(Validators.notEqual(7)(new FormControl(7.000001))).toBeNull();
        });

        it('should pass with default delta and other value than 0 below valdation value', () => {
            expect(Validators.notEqual(7)(new FormControl(6.999999))).toBeNull();
        });

        it('should pass with default delta', () => {
            expect(Validators.notEqual(0, 0.001)(new FormControl(0.001))).toBeNull();
        });

        it('should pass with value larger than validation value', () => {
            expect(Validators.notEqual(0)(new FormControl(1000))).toBeNull();
        });

        it('should pass with value less than validation value', () => {
            expect(Validators.notEqual(0)(new FormControl(-1000))).toBeNull();
        });
    });

    describe('fields equal', () => {
        it('should not error if fields are equal', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl('abc123'), b: new FormControl('abc123')});
            expect(Validators.fieldsEqual('a', 'b')(form)).toBeNull();
        });

        it('should not error if both fields are null', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl(null), b: new FormControl(null)});
            expect(Validators.fieldsEqual('a', 'b')(form)).toBeNull();
        });

        it('should error if fields are not equal', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl('abc123'), b: new FormControl('ABC123')});
            expect(Validators.fieldsEqual('a', 'b')(form)).toEqual({
                fieldsequal: {value: 'abc123', compared: 'ABC123'}
            });
        });

        it('should error if one field is null and fields are not equal', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl('abc123'), b: new FormControl(null)});
            expect(Validators.fieldsEqual('a', 'b')(form)).toEqual({
                fieldsequal: {value: 'abc123', compared: null}
            });
        });
    });

    describe('fields not equal', () => {

        it('should not error if fields are not equal', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl('abc123'), b: new FormControl('ABC123')});
            expect(Validators.fieldsNotEqual('a', 'b')(form)).toBeNull();
        });

        it('should not error if one field is null and fields are not equal', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl('abc123'), b: new FormControl(null)});
            expect(Validators.fieldsNotEqual('a', 'b')(form)).toBeNull();
        });

        it('should error if fields are equal', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl('abc123'), b: new FormControl('abc123')});
            expect(Validators.fieldsNotEqual('a', 'b')(form)).toEqual({
                fieldsnotequal: {value: 'abc123'}
            });
        });

        it('should not error if both fields are null', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl(null), b: new FormControl(null)});
            expect(Validators.fieldsNotEqual('a', 'b')(form)).toBeNull();
        });
    });

    describe('xor', () => {

        it('should not error if one field has value and other is null', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl('abc123'), b: new FormControl(null)});
            expect(Validators.xor('a', 'b')(form)).toBeNull();
        });

        it('should not error if one field has value and other is falsy', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl(false), b: new FormControl('abc123')});
            expect(Validators.xor('a', 'b')(form)).toBeNull();
        });

        it('should error if both fields are null', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl(null), b: new FormControl(null)});
            expect(Validators.xor('a', 'b')(form)).toEqual({xor: {value: null, compared: null}});
        });

        it('should error if both fields are falsy', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl(false), b: new FormControl(undefined)});
            expect(Validators.xor('a', 'b')(form)).toEqual({xor: {value: false, compared: null}});
        });

        it('should error if both fields have truthy value', () => {
            const form: FormGroup =
                new FormGroup({a: new FormControl('abc'), b: new FormControl(123)});
            expect(Validators.xor('a', 'b')(form)).toEqual({xor: {value: 'abc', compared: 123}});
        });
    });

    describe('unique array', () => {

        it('should not error if array is empty', () => {
            const form: FormArray = new FormArray([]);
            expect(Validators.uniqueArray('a')(form)).toBeNull();
        });

        it('should not error if array values are unique', () => {
            const form: FormArray = new FormArray([
                new FormGroup({a: new FormControl('abc')}),
                new FormGroup({a: new FormControl('123')})
            ]);
            expect(Validators.uniqueArray('a')(form)).toBeNull();
        });

        it('should not error if not unique values are falsy', () => {
            const form: FormArray = new FormArray([
                new FormGroup({a: new FormControl(null)}),
                new FormGroup({a: new FormControl(false)})
            ]);
            expect(Validators.uniqueArray('a')(form)).toBeNull();
        });

        it('should error if not unique values are truthy', () => {
            const form: FormArray = new FormArray([
                new FormGroup({a: new FormControl('abc')}),
                new FormGroup({a: new FormControl('abc')})
            ]);
            expect(Validators.uniqueArray('a')(form)).toEqual({uniquearray: {value: 'a'}});
        });
    });

    describe('email', () => {
        it('should not error if email is empty', () => {
            const control: FormControl = new FormControl('');
            expect(Validators.email(control)).toBeNull();
        });

        it('should error if email is invalid', () => {
            const control: FormControl = new FormControl('test.gmail.com');
            expect(Validators.email(control)).toEqual({email: {value: 'test.gmail.com'}});
        });

        it('should not error if email is valid', () => {
            const control: FormControl = new FormControl('test@gmail.com');
            expect(Validators.email(control)).toBeNull();
        });

        it('should not error if email is null', () => {
            const control: FormControl = new FormControl(null);
            expect(Validators.email(control)).toBeNull();
        });
    });

    describe('multi unique array', () => {

        it('should not error if array is empty', () => {
            const form: FormArray = new FormArray([]);
            expect(Validators.multiUniqueArray('a', 'b')(form)).toBeNull();
        });

        it('should not error if array values are unique', () => {
            const form: FormArray = new FormArray([
                new FormGroup({a: new FormControl('abc'), b: new FormControl('def')}),
                new FormGroup({a: new FormControl('123'), b: new FormControl('456')})
            ]);
            expect(Validators.multiUniqueArray('a', 'b')(form)).toBeNull();
        });

        it('should not error if not unique values are falsy', () => {
            const form: FormArray = new FormArray([
                new FormGroup({a: new FormControl(null), b: new FormControl(undefined)}),
                new FormGroup({a: new FormControl(false), b: new FormControl(5)})
            ]);
            expect(Validators.multiUniqueArray('a', 'b')(form)).toBeNull();
        });

        it('should error if not unique values are truthy in same column', () => {
            const form: FormArray = new FormArray([
                new FormGroup({a: new FormControl('abc'), b: new FormControl('123')}),
                new FormGroup({a: new FormControl('abc'), b: new FormControl('456')})
            ]);
            expect(Validators.multiUniqueArray('a', 'b')(form)).toEqual({
                multiuniquearray: {value: ['a', 'b']}
            });
        });

        it('should error if not unique values are truthy in different columns', () => {
            const form: FormArray = new FormArray([
                new FormGroup({a: new FormControl('abc'), b: new FormControl('123')}),
                new FormGroup({a: new FormControl('123'), b: new FormControl('456')})
            ]);
            expect(Validators.multiUniqueArray('a', 'b')(form)).toEqual({
                multiuniquearray: {value: ['a', 'b']}
            });
        });
    });

    describe('first item unique array', () => {
        it('should not error if values are unique compared to first column values', () => {
            const form: FormArray = new FormArray([
                new FormGroup({a: new FormControl('abc'), b: new FormControl('def')}),
                new FormGroup({a: new FormControl('123'), b: new FormControl('456')}),
                new FormGroup({a: new FormControl('123'), b: new FormControl('456')})
            ]);
            expect(Validators.firstItemUnique('a', 'b')(form)).toBeNull();
        });

        it('should not error if not unique values are falsy', () => {
            const form: FormArray = new FormArray([
                new FormGroup({a: new FormControl(null), b: new FormControl(undefined)}),
                new FormGroup({a: new FormControl(false), b: new FormControl(5)})
            ]);
            expect(Validators.firstItemUnique('a', 'b')(form)).toBeNull();
        });

        it('should error if values are not unique in a column compared to first column values and outputs index where error occurred',
           () => {
               const form: FormArray = new FormArray([
                   new FormGroup({a: new FormControl('abc'), b: new FormControl('def')}),
                   new FormGroup({a: new FormControl('123'), b: new FormControl('456')}),
                   new FormGroup({a: new FormControl('123'), b: new FormControl('abc')})
               ]);
               expect(Validators.firstItemUnique('a', 'b')(form)).toEqual({
                   firstitemunique: {value: ['a', 'b'], index: 2}
               });
           });

        it('should error if values are not unique in any column compared to first column values and outputs index where error occurred',
           () => {
               const form: FormArray = new FormArray([
                   new FormGroup({a: new FormControl('abc'), b: new FormControl('def')}),
                   new FormGroup({a: new FormControl('def'), b: new FormControl('def')}),
                   new FormGroup({a: new FormControl('123'), b: new FormControl('abc')})
               ]);
               expect(Validators.firstItemUnique('a', 'b')(form)).toEqual({
                   firstitemunique: {value: ['a', 'b'], index: 1}
               });
           });
    });

    describe('is in array', () => {

        const arr = [
            {id: 1, value: 'test1'}, {id: 2, value: 'test2'}, {id: 3, value: 'test3'},
            {id: 4, value: 'test4'}, {id: 5, value: 'test5'}
        ];

        it('should not error on empty string', () => {
            expect(Validators.isInArray(arr)(new FormControl(''))).toBeNull();
        });

        it('should not error on null', () => {
            expect(Validators.isInArray(arr)(new FormControl(null))).toBeNull();
        });

        it('should not error if id is in array', () => {
            expect(Validators.isInArray(arr)(new FormControl(1))).toBeNull();
        });

        it('should error if id is not in array', () => {
            expect(Validators.isInArray(arr)(new FormControl(99))).toEqual({
                isInArray: {options: arr, value: 99}
            });
        });
    });

});
