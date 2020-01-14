import { Injectable } from '@angular/core';
import { AudiencesService, ConfigService, TenantStoreService } from '@cl-core-services';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { PeriodType } from '@cl-core/models/period-type.enum';
import { LoyaltyPointsExpireTrigger } from '../models/loyalty-points-expire-trigger.enum';
import { RulePointType } from '@cl-core/models/loyalty/rule-point-type.enum';
import { RuleSetMatchType } from '@cl-core/models/loyalty/rule-set-match-type.enum';
import { RuleConditionType } from '@cl-core/models/loyalty/rule-condition-type.enum';
import { RuleOperatorType } from '@cl-core/models/loyalty/rule-operator-type.enum';
import { TenantService } from '@cl-core/services/tenant.service';

const matchType: OptionConfig[] = [
  {value: RuleSetMatchType.first, title: 'LOYALTY_FEATURE.MATCH_TYPE.MATCH_FIRST'},
  {value: RuleSetMatchType.all, title: 'LOYALTY_FEATURE.MATCH_TYPE.MATCH_ALL'},
];

const ruleOperators: OptionConfig[] = [
  {value: RuleOperatorType.equal, title: 'LOYALTY_FEATURE.OPERATOR_TYPE.EQUAL'},
  {value: RuleOperatorType.unequal, title: 'LOYALTY_FEATURE.OPERATOR_TYPE.UNEQUAL'},
  {value: RuleOperatorType.less, title: 'LOYALTY_FEATURE.OPERATOR_TYPE.LESS'},
  {value: RuleOperatorType.greater, title: 'LOYALTY_FEATURE.OPERATOR_TYPE.GREATER'},
  {value: RuleOperatorType.lessOrEqual, title: 'LOYALTY_FEATURE.OPERATOR_TYPE.lESS_OR_EQUAL'},
  {value: RuleOperatorType.greaterOrEqual, title: 'LOYALTY_FEATURE.OPERATOR_TYPE.GREATER_OR_EQUAL'},
];

const transactionType: OptionConfig[] = [
  {value: 'prepaid', title: 'LOYALTY_FEATURE.TRANSACTION_TYPE.PREPAID'},
  {value: 'cod', title: 'LOYALTY_FEATURE.TRANSACTION_TYPE.COD'},
  {value: 'store', title: 'LOYALTY_FEATURE.TRANSACTION_TYPE.STORE'},
];

const conditionType: { value: string, title: string, limit?: number }[] = [
  {value: RuleConditionType.transaction, title: 'LOYALTY_FEATURE.CONDITION_TYPE.TRANSACTION', limit: 1},
  {value: RuleConditionType.amount, title: 'LOYALTY_FEATURE.CONDITION_TYPE.AMOUNT'},
  {value: RuleConditionType.currency, title: 'LOYALTY_FEATURE.CONDITION_TYPE.CURRENCY', limit: 1},
  {value: RuleConditionType.fromDate, title: 'LOYALTY_FEATURE.CONDITION_TYPE.FROM_DATE', limit: 1},
  {value: RuleConditionType.toDate, title: 'LOYALTY_FEATURE.CONDITION_TYPE.TO_DATE', limit: 1},
];

const pointsExpirePeriodType: OptionConfig[] = [
  {value: PeriodType.day, title: 'DAY'},
  {value: PeriodType.week, title: 'WEEK'},
  {value: PeriodType.month, title: 'MONTH'},
  {value: PeriodType.year, title: 'YEAR'},
];

const pointsExpireTrigger: OptionConfig[] = [
  {value: LoyaltyPointsExpireTrigger.accrual, title: 'LOYALTY_FEATURE.FROM_ACCRUAL'},
  {value: LoyaltyPointsExpireTrigger.inactivity, title: 'LOYALTY_FEATURE.FROM_USER_INACTIVITY'},
];

const rulePointsType: OptionConfig[] = [
  {value: RulePointType.bonus, title: 'LOYALTY_FEATURE.RULE_POINT_TYPE.BONUS'},
  {value: RulePointType.multiplier, title: 'LOYALTY_FEATURE.RULE_POINT_TYPE.MULTIPLIER'},
];

@Injectable()
export class LoyaltyConfigService {
  constructor(private configService: ConfigService,
              private tenantService: TenantService,
              private audiencesService: AudiencesService,
              private tenantStoreService: TenantStoreService) {

  }

  public getLoyaltyManageConfig(): Observable<any> {
    return combineLatest([
      this.audiencesService.getAudiencesList(),
      this.tenantStoreService.currency$
    ]).pipe(
      map(([pools, currency]) => ({
        pools,
        currency,
        matchType,
        pointsExpirePeriodType,
        pointsExpireTrigger
      }))
    );
  }

  public getLoyaltySetupRuleConfig(): Observable<any> {
    return combineLatest(
      this.tenantService.getCurrency()
    ).pipe(
      map(([currencyList]) => ({
        currencyList,
        ruleOperators,
        transactionType,
        conditionType,
        rulePointsType
      }))
    );
  }

  public getLoyaltyViewConfig(): Observable<any> {
    return combineLatest(
      this.configService.prepareStatusesLabel(),
    ).pipe(
      map(([statusLabel]) => ({
        statusLabel,
        matchType
      }))
    );
  }

}
