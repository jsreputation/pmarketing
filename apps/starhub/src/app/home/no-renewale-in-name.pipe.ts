import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'noRenewaleInName' })
export class NoRenewaleInNamePipe implements PipeTransform {
  public transform(name: string | undefined): string {
    if (!name) {
      return '';
    }
    return name.toLowerCase().endsWith('(renewal)') ? name.substring(0, name.length - ' (Renewal)'.length) : name;
  }
}
