import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'meterToKilometer'})
export class MeterToKilometerPipe implements PipeTransform {
  transform(value: number | string): string | number {
    const number = typeof value === 'string' ? parseInt(value) : value;
    return value ? (number/1000).toFixed(1) : value;
  }
}
