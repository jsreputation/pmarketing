import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (environment.UXCR) {
  document.body.classList.add('electric-green');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err: any) => console.error(err));
