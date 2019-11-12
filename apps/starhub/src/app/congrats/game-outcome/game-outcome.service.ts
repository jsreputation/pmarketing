import { Injectable } from '@angular/core';
import {IGameOutcome, Voucher} from '@perx/core';

@Injectable({
  providedIn: 'root'
})
export class GameOutcomeService {
  private vouchers: Voucher[];
  private outcome: IGameOutcome;

  public getVouchersRewarded(): Voucher[] {
    return this.vouchers;
  }

  public setVouchersList(vouchers: Voucher[]): void {
    this.vouchers = vouchers;
  }

  public clearVoucherList(): void {
    this.vouchers = [];
  }

  public getOutcome(): IGameOutcome {
    return this.outcome;
  }

  public setOutcome(outcome: IGameOutcome): void {
    this.outcome = outcome;
  }
}
