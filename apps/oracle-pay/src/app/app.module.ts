import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { VouchersModule, PuzzlesModule, VouchersService } from '@perx/core';

const vouchersServiceStub = {};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VouchersModule,
    PuzzlesModule
  ],
  providers: [
    { provide: VouchersService, useValue: vouchersServiceStub }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
