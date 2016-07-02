import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppComponent, environment} from './app/';
import {APP_SERVICES} from './services/app.services';

if (environment.production) {
    enableProdMode();
}

bootstrap(AppComponent, [APP_SERVICES]);
