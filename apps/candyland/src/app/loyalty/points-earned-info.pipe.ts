import { Pipe, PipeTransform } from '@angular/core';
import { ILoyaltyRulePoint } from '@cl-core/models/loyalty/loyalty-rules.model';
import { TranslateService } from '@ngx-translate/core';
import { RulePointType } from '@cl-core/models/loyalty/rule-point-type.enum';

@Pipe({
  name: 'clPointsEarnedInfo'
})
export class PointsEarnedInfoPipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  public transform(point: ILoyaltyRulePoint): string {
    const args: [string, { [key: string]: number | string }] | null = this.getTextWithArgs(point);
    return args ? this.translate.instant(...args) : '';
  }

  public getTextWithArgs(point: ILoyaltyRulePoint): [string, { [key: string]: number | string }] | null {
    if (!(point && 'applierType' in point)) {
      return null;
    }
    switch (point.applierType) {
      case RulePointType.multiplier:
        return ['LOYALTY_FEATURE.RULE_POINT_TEMPLATE.MULTIPLIER', {amount: +point.amount}];
      case RulePointType.bonus:
        return ['LOYALTY_FEATURE.RULE_POINT_TEMPLATE.BONUS', {amount: +point.amount}];
      default:
        return null;
    }
  }
}
