import { Pipe, PipeTransform } from '@angular/core';
import { ICampaignOutcome, IProgressLevel } from '@perxtech/core';

@Pipe({
  name: 'outcomesFromLevelPipe',
  pure: false
})
export class OutcomesFromLevelPipe implements PipeTransform {
  transform(items: ICampaignOutcome[], filter: IProgressLevel): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.levelId === filter.id);
  }
}
