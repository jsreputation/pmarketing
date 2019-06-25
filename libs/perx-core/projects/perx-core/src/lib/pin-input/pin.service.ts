import { IVoucher } from './../../../../../dist/perx-core/lib/campaign/campaign.service.d';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { VouchersService } from './../vouchers/vouchers.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor(private vouchersService: VouchersService) { }

  getPin(voucherId: number): Observable<string> {
    let rewardId = '0000';
    this.vouchersService.getAll().pipe(
      map(vouchers => {
        return vouchers.filter(v => v.state === 'issued' && v.id === voucherId);
      })
    ).subscribe(vouchers => {
      if (vouchers[0]) {
        // tslint:disable-next-line: radix
        rewardId = typeof vouchers[0].rewardId === 'string' ? vouchers[0].rewardId : vouchers[0].rewardId.toString();
      }
    });
    const pinCode = this.generatePinCode(rewardId);
    return of(pinCode);
  }

  generatePinCode(rewardId: string) {
    const pinCode = ('0000' + rewardId).slice(-4);
    return pinCode;
  }
}
