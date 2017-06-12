import {Injectable} from '@angular/core';

@Injectable()
export class ValidationService {
    public constructor() {}

    public isObject(obj: any): boolean {
        return obj === Object(obj);
    }

    public isNumber(value: string): boolean {
        return /^[-+]?\d+$/.test(value);
    }

    public isArray(obj: any): boolean {
        return obj instanceof Array;
    }
}
