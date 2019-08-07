// Un comment the commented code in this file to enable chineese language
import {
  enableProdMode,
  // TRANSLATIONS,
  // TRANSLATIONS_FORMAT,
  // MissingTranslationStrategy
} from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// declare const require;
// const translations = require(`raw-loader!../locale/messages.zh-Hans.xlf`);

platformBrowserDynamic().bootstrapModule(AppModule, {
  // missingTranslation: MissingTranslationStrategy.Error,
  // providers: [
  //   {provide: TRANSLATIONS, useValue: translations},
  //   {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  // ]
})
  .catch(err => console.error(err));
