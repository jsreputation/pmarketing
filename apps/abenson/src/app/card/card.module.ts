import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxBarcodeModule } from 'ngx-barcode';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './containers/card/card.component';
import { ExistingCardComponent } from './containers/existing-card/existing-card.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    CardComponent,
    ExistingCardComponent,
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    NgxBarcodeModule,
    SharedModule,
  ],
})
export class CardModule { }
