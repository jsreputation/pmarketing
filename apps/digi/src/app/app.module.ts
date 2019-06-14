import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PerxCoreModule } from '@perx/core/dist/perx-core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PerxCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
