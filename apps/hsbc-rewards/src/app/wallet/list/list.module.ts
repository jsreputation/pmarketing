import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { of, Observable } from 'rxjs';
import { VouchersModule, Voucher } from '@perx/core';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { voucher } from 'src/assets/mock/vouchers';

export class VoucherStubService {
  public getAll(): Observable<Voucher[]> {
      return of(voucher);
  }
}

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    VouchersModule,
    SharedModule,
    MatIconModule,
  ]
})
export class ListModule { }
