import {
  Pipe,
  PipeTransform
} from '@angular/core';

// intent to use a conversion rate of 100 points : 1 dollar.
@Pipe({ name: 'pointsToCash' })
export class PointsToCashPipe implements PipeTransform {
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
