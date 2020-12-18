import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getStartInfo',
  pure: true
})
export class GettingStartedPipe implements PipeTransform {
  public transform(value: string, completed: boolean): any {
    const splitStringArray = value.toLowerCase();
    if (splitStringArray.includes('card')) {
      return `You've ${completed ? '<strong>activated</strong>' : '<strong>not</strong> activated'} ${value}`;
    }
    return `You've ${completed ? '<strong>completed</strong>' : '<strong>not</strong> completed'} ${value}`;
  }
}
