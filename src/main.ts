import './polyfills.ts';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {DevelopmentModule} from './development/development.module';

platformBrowserDynamic().bootstrapModule(DevelopmentModule);
