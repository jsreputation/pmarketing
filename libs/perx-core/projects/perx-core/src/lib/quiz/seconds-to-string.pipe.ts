import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToString',
}) // can make reusable by tasking in param the length
export class SecondsToStringPipe implements PipeTransform {
  public transform(d: number): string {
    if (d < 0) {
      return '';
    }
    const minutes: number = Math.floor(d / 60);
    let minutesStr = `${minutes}`.padStart(2, '0');
    let seconds = Math.floor(d - minutes * 60);
    let secondsStr = `${seconds}`.padStart(2, '0');
    return `${minutesStr}:${secondsStr}`;
  }
}
