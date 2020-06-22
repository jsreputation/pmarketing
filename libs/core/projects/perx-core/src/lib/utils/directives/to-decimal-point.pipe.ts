import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({ name: 'toDecimalPoints' })
export class DecimalPointsPipe implements PipeTransform {
  public transform(value: number, decimalPoints: number): string {
    return this.convertToNDecimals(value, decimalPoints);
  }

  public convertToNDecimals(value: number, decimalPoints: number): string {
    return parseFloat(
      String(Number(`${
        Math.floor(
          Number(`${Math.abs(value) / 100}e${decimalPoints}`)
        )}e-${decimalPoints}`
      ))).toFixed(decimalPoints);
  }
}
