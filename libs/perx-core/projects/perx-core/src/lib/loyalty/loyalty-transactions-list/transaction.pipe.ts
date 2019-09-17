import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'transaction'})
export class TransactionPipe implements PipeTransform {
  public transform(value: number): string {
    return `Points ${value < 0 ? 'spent' : 'earned'}`;
  }
}
