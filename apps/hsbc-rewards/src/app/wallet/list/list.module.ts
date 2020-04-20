import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { ConfigModule, VouchersModule } from '@perxtech/core';

import { SharedModule } from '../../shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    ConfigModule.forChild(),
    CommonModule,
    ListRoutingModule,
    VouchersModule,
    SharedModule,
    MatIconModule,
  ]
})
export class ListModule { }
