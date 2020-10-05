import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getStartInfo',
  pure: true
})
export class GettingStartedPipe implements PipeTransform {
  public transform(value: string, completed: boolean): any {
    const splitStringArray = value.split(' ');
    if (splitStringArray.includes('eKYC')) {
      return `You've ${completed ?  '<strong>done</strong>' : '<strong>not</strong> done'} ${splitStringArray.pop()}`;
    }
    return `You've ${completed ? '<strong>done</strong>' : '<strong>not</strong> done'} ${value}`;
  }
}
