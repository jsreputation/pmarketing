import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'uppercaseSplit'
})
export class UppercaseSplitPipe implements PipeTransform {
  public transform(value: any): any {
    if (!value) {
      return '';
    }
    return value.split(/(?=[A-Z])/).join(' ');
  }
}
