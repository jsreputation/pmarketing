import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxBarcode6Module } from 'ngx-barcode6';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './containers/card/card.component';
import { ExistingCardComponent } from './containers/existing-card/existing-card.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CardComponent,
    ExistingCardComponent,
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    NgxBarcode6Module,
    SharedModule,
    InfiniteScrollModule,
  ],
})
export class CardModule { }
