import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { IVoucherIdPair } from '../vouchers/models/voucher.model';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  public voucherIdPairs: IVoucherIdPair[];
  constructor() { }
  getPin(voucherId: number): Observable<string> {
    let rewardId = '0000';
    if (this.voucherIdPairs && this.voucherIdPairs.length > 0) {
      const idPair = this.voucherIdPairs.filter(tempIdPair =>
        tempIdPair.voucherId === voucherId
      )[0];
      rewardId = idPair.rewardId ? idPair.rewardId.toString() : '0000';
    }

    const pinCode = this.generatePinCode(rewardId);
    return of(pinCode);
  }

  setPins(voucherIdPairs: IVoucherIdPair[]) {
    this.voucherIdPairs = voucherIdPairs;
  }

  generatePinCode(rewardId: string) {
    const pinCode = ('0000' + rewardId).slice(-4);
    return pinCode;
  }
}
