import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { ConfigModule, VouchersModule } from '@perxtech/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from '../../../environments/environment';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    CommonModule,
    ListRoutingModule,
    VouchersModule,
    SharedModule,
    MatIconModule,
  ]
})
export class ListModule { }
