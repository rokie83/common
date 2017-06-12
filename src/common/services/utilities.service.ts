import {Injectable} from '@angular/core';

import {ValidationService} from './validation.service';

const standardObjects = [Date];

@Injectable()
export class UtilitiesService {
    public constructor(private validationService: ValidationService) {}

    public snakeToCamelArray(objects: Object[]): Object[] {
        for (let i = 0; i < objects.length; i++) {
            objects[i] = this.snakeToCamel(objects[i]);
        }
        return objects;
    }

    public camelToSnakeArray(objects: Object[]): Object[] {
        for (let i = 0; i < objects.length; i++) {
            objects[i] = this.camelToSnake(objects[i]);
        }
        return objects;
    }

    public snakeToCamel(object: Object): Object {
        return this.transformKeys(object, this.snakeToCamelTransformer);
    }

    public camelToSnake(object: Object): Object {
        return this.transformKeys(object, this.camelToSnakeTransformer);
    }

    private transformKeys(obj: any, convert: Function): Object {
        if (!this.validationService.isObject(obj) ||
            standardObjects.some(standardObject => obj instanceof standardObject)) {
            return obj;
        }
        if (this.validationService.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                obj[i] = this.transformKeys(obj[i], convert);
            }
            return obj;
        }
        const output = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                output[convert(key)] = this.transformKeys(obj[key], convert);
            }
        }
        return output;
    }

    private snakeToCamelTransformer(str: string): string {
        return str.replace(/_\w/g, a => a[1].toUpperCase());
    }

    private camelToSnakeTransformer(str: string): string {
        return str.replace(/([A-Z])/g, a => '_' + a.toLowerCase());
    }
}
