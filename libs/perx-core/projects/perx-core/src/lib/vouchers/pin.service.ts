import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVoucherService } from './ivoucher.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor(private vouchersService: IVoucherService) { }

  public getPin(voucherId: number): Observable<string> {
    return this.vouchersService.get(voucherId).pipe(
      map(voucher => {
        let rewardId = '0000';
        if (voucher && voucher.reward) {
          // tslint:disable-next-line: radix
          rewardId = voucher.reward.id.toString();
        }
        return this.generatePinCode(rewardId);
      }));
  }

  public generatePinCode(rewardId: string): string {
    return (`0000${rewardId}`).slice(-4);
  }
}
