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
                const dateTimeFirst = new Date(a.validTo).getTime();
                const dateTimeSecond = new Date(b.validTo).getTime();
                return (dateTimeFirst - dateTimeSecond);
              }
          }))
      );
  }
}
