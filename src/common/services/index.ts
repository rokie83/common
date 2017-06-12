import {HttpService} from './http.service';
import {UtilitiesService} from './utilities.service';
import {ValidationService} from './validation.service';

export {HttpService} from './http.service';
export {UtilitiesService} from './utilities.service';
export {ValidationService} from './validation.service';

export const bexioServices: any[] = [HttpService, UtilitiesService, ValidationService];
