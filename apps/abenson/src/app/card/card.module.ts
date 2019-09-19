import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';

import { NgxBarcodeModule } from 'ngx-barcode';

import { LoyaltyModule } from '@perx/core';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './containers/card/card.component';
import { ExistingCardComponent } from './containers/existing-card/existing-card.component';

@NgModule({
  declarations: [
    CardComponent,
    ExistingCardComponent,
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    LoyaltyModule,
    MatTabsModule,
    NgxBarcodeModule
  ],
})
export class CardModule { }
