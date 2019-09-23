import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PuzzlesModule, IVoucherService } from '@perx/core';
import { VouchersModule as PerxVouchersModule } from '@perx/core';
import { HttpClientModule } from '@angular/common/http';

const vouchersServiceStub = {};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PerxVouchersModule,
    PuzzlesModule,
    HttpClientModule
  ],
  providers: [
    { provide: IVoucherService, useValue: vouchersServiceStub }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
