import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PuzzlesModule, VouchersService } from '@perx/core';
import { VouchersModule as PerxVouchersModule } from '@perx/core';

const vouchersServiceStub = {};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PerxVouchersModule,
    PuzzlesModule
  ],
  providers: [
    { provide: VouchersService, useValue: vouchersServiceStub }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
