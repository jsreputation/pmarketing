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
    this.vouchersService.get(voucherId).subscribe(voucher => {
      if (voucher) {
        // tslint:disable-next-line: radix
        rewardId = typeof voucher.rewardId === 'string' ? voucher.rewardId : voucher.rewardId.toString();
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
