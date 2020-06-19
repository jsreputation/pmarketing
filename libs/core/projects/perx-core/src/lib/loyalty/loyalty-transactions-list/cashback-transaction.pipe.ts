import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'cashbackTransaction'})
export class CashbackTransactionPipe implements PipeTransform {
  public transform(value: number): string {
    return `$${this.twodp(value)} cashback ${value < 0 ? 'spent' : 'earned'}`;
  }

  private twodp(value: number) {
    return parseFloat(
      String(Number(`${
        Math.floor(
          Number(`${Math.abs(value) / 100}e2`)
        )}e-2`
      ))).toFixed(2);
  }
}
