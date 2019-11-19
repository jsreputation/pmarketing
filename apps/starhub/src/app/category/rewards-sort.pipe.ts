import { Pipe, PipeTransform } from '@angular/core';
import { IReward } from '@perx/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SortingMode } from './category.model';
@Pipe({
  name: 'rewardsSort'
})
export class RewardsSortPipe implements PipeTransform {

  public transform(allrewards: Observable<IReward[]>, mode?: SortingMode): Observable<IReward[]> {
      return allrewards.pipe(
          map(rewards => rewards.sort((a, b) => {
              if (mode === SortingMode.latest) {
                const dateTimeFirst = new Date(a.validFrom).getTime();
                const dateTimeSecond = new Date(b.validFrom).getTime();
                return (dateTimeSecond - dateTimeFirst);
              }
              if (mode === SortingMode.ending_soon) {
                const dateTimeFirst = a.validTo ? new Date(a.validTo).getTime(): 0;
                const dateTimeSecond = b.validTo ? new Date(b.validTo).getTime(): 0;
                return (dateTimeFirst - dateTimeSecond);
              }
              return 0;
          }))
      );
  }
}
