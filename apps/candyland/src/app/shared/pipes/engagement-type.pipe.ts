import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'engagementType' })
export class EngagementTypePipe implements PipeTransform {
  public transform(value: string): string {
    if (!value) {
      return '';
    }
    return value.split('_')
      .map(w => `${w.substring(0, 1).toLocaleUpperCase()}${w.substring(1).toLocaleLowerCase()}`)
      .join(' ');
  }
}
