import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'transaction'})
export class TransactionPipe implements PipeTransform {
  public transform(value: number): string {
    return `${Math.abs(value)} Points ${value < 0 ? 'spent' : 'earned'}`;
  }
}
