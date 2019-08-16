import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { VouchersModule } from '@perx/core';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    VouchersModule.forRoot({ env: environment }),
    SharedModule,
    MatIconModule,
  ]
})
export class ListModule { }
