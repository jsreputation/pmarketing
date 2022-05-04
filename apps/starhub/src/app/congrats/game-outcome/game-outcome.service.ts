import { Injectable } from '@angular/core';
import { IGameOutcome, IPrizeSetOutcome, Voucher } from '@perxtech/core';

@Injectable({
  providedIn: 'root'
})
export class GameOutcomeService {
  private vouchers: Voucher[] = [];
  private outcome: IGameOutcome;
  private prizeSetOutcome: IPrizeSetOutcome | undefined;

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

  public getPrizeSetOutcome(): IPrizeSetOutcome | undefined {
    return this.prizeSetOutcome || undefined;
  }

  public setPrizeSetOutcome(prizeSetOutcome: IPrizeSetOutcome) {
    this.prizeSetOutcome = prizeSetOutcome;
  }

  public clearPrizeSetOutcome(): void {
    this.prizeSetOutcome = undefined;
  }
}
