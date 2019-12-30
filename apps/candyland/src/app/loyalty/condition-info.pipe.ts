import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RuleConditionType } from '@cl-core/models/loyalty/rule-condition-type.enum';
import { DateTimeParser } from '@cl-helpers/date-time-parser';
import { RuleOperatorType } from '@cl-core/models/loyalty/rule-operator-type.enum';
import { ILoyaltyRuleCondition } from '@cl-core/models/loyalty/loyalty-rules.model';

@Pipe({
  name: 'clConditionInfo'
})
export class ConditionInfoPipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  public transform(conditions: ILoyaltyRuleCondition[]): string {
    return conditions.map(condition => {
      const args: [string, { [key: string]: number | string }] | null = this.getTextWithArgs(condition);
      return args ? this.translate.instant(...args) : '';
    })
      .filter(value => value !== null)
      .join('\nAND\n');
  }

  public getTextWithArgs(condition: ILoyaltyRuleCondition): [string, { [key: string]: any }] | null {
    if (!(condition && 'type' in condition)) {
      return null;
    }

    switch (condition.type) {
      case RuleConditionType.transaction:
        return ['LOYALTY_FEATURE.CONDITION_TYPE_TEMPLATE.TRANSACTION', {value: condition.value}];
      case RuleConditionType.amount:
        return ['LOYALTY_FEATURE.CONDITION_TYPE_TEMPLATE.AMOUNT',
          {value: condition.value, operator: this.getOperator(condition.operator)}
        ];
      case RuleConditionType.currency:
        return ['LOYALTY_FEATURE.CONDITION_TYPE_TEMPLATE.CURRENCY', {value: condition.value}];
      case RuleConditionType.toDate:
        return ['LOYALTY_FEATURE.CONDITION_TYPE_TEMPLATE.TO_DATE',
          {value: DateTimeParser.getTime(condition.value as string, 'DD.MM.YYYY')}];
      case RuleConditionType.fromDate:
        return ['LOYALTY_FEATURE.CONDITION_TYPE_TEMPLATE.FROM_DATE',
          {value: DateTimeParser.getTime(condition.value as string, 'DD.MM.YYYY')}];
      default:
        return null;
    }
  }

  private getOperator(type: string): string {
    switch (type) {
      case RuleOperatorType.equal:
        return this.translate.instant('LOYALTY_FEATURE.OPERATOR_TYPE.EQUAL');
      case RuleOperatorType.unequal:
        return this.translate.instant('LOYALTY_FEATURE.OPERATOR_TYPE.UNEQUAL');
      case RuleOperatorType.less:
        return this.translate.instant('LOYALTY_FEATURE.OPERATOR_TYPE.LESS');
      case RuleOperatorType.greater:
        return this.translate.instant('LOYALTY_FEATURE.OPERATOR_TYPE.GREATER');
      case RuleOperatorType.lessOrEqual:
        return this.translate.instant('LOYALTY_FEATURE.OPERATOR_TYPE.lESS_OR_EQUAL');
      case RuleOperatorType.greaterOrEqual:
        return this.translate.instant('LOYALTY_FEATURE.OPERATOR_TYPE.GREATER_OR_EQUAL');
      default:
        return '';
    }
  }
}
