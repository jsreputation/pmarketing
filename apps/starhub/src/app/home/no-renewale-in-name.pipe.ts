import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'noRenewaleInName' })
export class NoRenewaleInNamePipe implements PipeTransform {
  public transform(name: string | null): string {
    if (name === null) {
      return '';
    }
    return name.toLowerCase().endsWith('(renewal)') ? name.substring(0, name.length - ' (Renewal)'.length) : name;
  }
}
