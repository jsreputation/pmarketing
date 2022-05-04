import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IReward } from '../../rewards/models/reward.model';

export enum SortingMode {
  latest = 'Latest',
  endingSoon = 'Ending',
  az = 'AZ',
  za = 'ZA'
}

@Pipe({
  name: 'RewardsSort'
})
export class SortRewardsPipe implements PipeTransform {
  // partial for more scope and possibility of different sortable interfaces
  public transform(sortableItems: Observable<IReward[]>, mode?: SortingMode): Observable<IReward[]> {
    return sortableItems.pipe(
      map(sortItems => {
        // without specifying the compare function by default it will infer from id, which is not intended
        if (mode === SortingMode.az) {
          return sortItems.sort((a, b) => a.name < b.name ? -1 : 1);
        }
        if (mode === SortingMode.za) {
          return sortItems.sort((a, b) => a.name > b.name ? -1 : 1);
        }
        return sortItems.sort((a, b) => {
          if (mode === SortingMode.latest) {
            const dateTimeFirst = a.validFrom ? new Date(a.validFrom).getTime() : 0;
            const dateTimeSecond = b.validFrom ? new Date(b.validFrom).getTime() : 0;
            return (dateTimeSecond - dateTimeFirst);
          }
          if (mode === SortingMode.endingSoon) {
            const dateTimeFirst = a.validTo ? new Date(a.validTo).getTime() : 0;
            const dateTimeSecond = b.validTo ? new Date(b.validTo).getTime() : 0;
            return (dateTimeFirst - dateTimeSecond);
          }
          return 0;
        });
      })
    );
  }
}
