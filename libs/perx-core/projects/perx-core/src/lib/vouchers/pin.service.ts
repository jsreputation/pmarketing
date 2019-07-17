import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VouchersService } from './vouchers.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor(private vouchersService: VouchersService) { }

  public getPin(voucherId: number): Observable<string> {
    return this.vouchersService.get(voucherId).pipe(
      map(voucher => {
        let rewardId = '0000';
        if (voucher) {
          // tslint:disable-next-line: radix
          rewardId = voucher.rewardId.toString();
        }
        return this.generatePinCode(rewardId);
      }));
  }

  public generatePinCode(rewardId: string): string {
    const pinCode = ('0000' + rewardId).slice(-4);
    return pinCode;
  }
}
