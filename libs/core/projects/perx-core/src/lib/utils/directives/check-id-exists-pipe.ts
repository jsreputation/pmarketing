import { Pipe, PipeTransform } from '@angular/core';
import { IReward } from '../../rewards/models/reward.model';

@Pipe({ name: 'checkId' })
export class CheckIdExistsPipe implements PipeTransform {
  public transform(values: IReward[], value: number ): string {
    return values.find(rwd => rwd.id === value) ? 'favorite' : 'favorite_border';
  }
}
