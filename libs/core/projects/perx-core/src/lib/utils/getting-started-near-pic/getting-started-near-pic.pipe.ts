import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getStartNear',
  pure: true
})
export class GettingStartedNearPicPipe implements PipeTransform {
  public transform(value: string): any {
    const splitStringArray = value.toLowerCase();
    if (splitStringArray.includes('card')) {
      return `Activate ${value}`;
    }
    return `Complete ${value}`;
  }
}
