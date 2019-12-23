import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IPointsExpiry } from '@cl-core/models/loyalty/loyalty-form.model';
import { LoyaltyPointsExpireTrigger } from './models/loyalty-points-expire-trigger.enum';

@Pipe({
  name: 'clPointsExpiredInfo'
})
export class PointsExpiredInfoPipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  public transform(point: IPointsExpiry): string {

    let text = '';

    if (!point) {
      return text;
    }

    if ('amount' in point && point.amount) {
      text += point.amount;
    }

    if ('type' in point && point.type) {
      text += ' ' + this.translate.instant(point.type.toUpperCase()).toLowerCase();
    }

    if ('trigger' in point && point.trigger === LoyaltyPointsExpireTrigger.accrual) {
      text += ' ' + this.translate.instant('LOYALTY_FEATURE.FROM_ACCRUAL');
    }

    if ('trigger' in point && point.trigger === LoyaltyPointsExpireTrigger.inactivity) {
      text += ' ' + this.translate.instant('LOYALTY_FEATURE.FROM_USER_INACTIVITY');
    }

    return text;
  }

}
