import { Pipe, PipeTransform } from '@angular/core';
/*
 * Strips HTML
 * Takes an input parameter HTML.
 * Usage:
 *   content | striphtml
 * Example:
 *   <p [innerHTML]="content | striphtml"></p>
*/
@Pipe({
  name: 'striphtml'
})
export class StripHtmlPipe implements PipeTransform {
  public transform(value: any): any {
    if ((value === null) || (value === '')) {
      return '';
    }
    return value.replace(/<(?:.|\n)*?>/gm, ' ');
  }
}
