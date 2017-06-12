import {ModuleWithProviders, NgModule} from '@angular/core';

import {bexioComponents} from './components';
/*tslint:disable-next-line:max-line-length */
import {bexioServices} from './services';

@NgModule({declarations: bexioComponents, exports: bexioComponents, providers: bexioServices})
export class BexioModule {
    public static forRoot(): ModuleWithProviders {
        return {ngModule: BexioModule, providers: []};
    }
}
