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
                return (b.validFrom.getTime() - a.validFrom.getTime());
              }
              if (mode === SortingMode.ending_soon) {
                return (a.validTo.getTime() - b.validTo.getTime());
              }
          }))
      );
  }
}
