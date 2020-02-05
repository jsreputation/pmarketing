import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { of, Observable } from 'rxjs';
import { VouchersModule, Voucher, ConfigModule } from '@perx/core';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { voucher } from 'src/assets/mock/vouchers';
import { environment } from '../../../environments/environment';

export class VoucherStubService {
  public getAll(): Observable<Voucher[]> {
    return of(voucher);
  }
}

@NgModule({
  declarations: [ListComponent],
  imports: [
    ConfigModule.forRoot({...environment}),
    CommonModule,
    ListRoutingModule,
    VouchersModule,
    SharedModule,
    MatIconModule,
  ]
})
export class ListModule { }
