import { Injectable } from '@angular/core';
import { Voucher } from '@perx/core';

@Injectable({
  providedIn: 'root'
})
export class GameOutcomeService {
  private vouchers: Voucher[];

  public getVouchersRewarded(): Voucher[] {
    return this.vouchers;
  }

  public setVouchersList(vouchers: Voucher[]): void {
    this.vouchers = vouchers;
  }

  public clearVoucherList(): void {
    this.vouchers = [];
  }
}
