import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingRoutingModule } from './loading-routing.module';
import {
  LoadingComponent,
  PerxBlackcombPagesModule
} from '@perxtech/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    LoadingRoutingModule,
    SharedModule,
    PerxBlackcombPagesModule
  ]
})
export class LoadingModule { }
