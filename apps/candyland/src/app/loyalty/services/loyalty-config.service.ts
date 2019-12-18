import { Injectable } from '@angular/core';
import { AudiencesService, ConfigService, SettingsService } from '@cl-core-services';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { PeriodType } from '@cl-core/models/period-type.enum';
import { LoyaltyPointsExpireTrigger } from '../models/loyalty-points-expire-trigger.enum';
import { RulePointType } from '@cl-core/models/loyalty/rule-point-type.enum';

const matchType: OptionConfig[] = [
  {value: 'match_first', title: 'LOYALTY_FEATURE.MATCH_TYPE.MATCH_FIRST'},
  {value: 'match_all', title: 'LOYALTY_FEATURE.MATCH_TYPE.MATCH_ALL'},
];

const ruleOperators: OptionConfig[] = [
  {value: 'equal', title: '='},
  {value: 'unequal', title: '≠'},
  {value: 'less', title: '<'},
  {value: 'greater', title: '>'},
  {value: 'less_or_equal', title: '≤'},
  {value: 'greater_or_equal', title: '≥'},
];

const transactionType: OptionConfig[] = [
  {value: 'prepaid', title: 'LOYALTY_FEATURE.TRANSACTION_TYPE.PREPAID'},
  {value: 'cod', title: 'LOYALTY_FEATURE.TRANSACTION_TYPE.COD'},
  {value: 'store', title: 'LOYALTY_FEATURE.TRANSACTION_TYPE.STORE'},
];

const conditionType: { value: string, title: string, limit?: number }[] = [
  {value: 'transaction', title: 'LOYALTY_FEATURE.CONDITION_TYPE.TRANSACTION', limit: 1},
  {value: 'amount', title: 'LOYALTY_FEATURE.CONDITION_TYPE.AMOUNT'},
  {value: 'currency', title: 'LOYALTY_FEATURE.CONDITION_TYPE.CURRENCY', limit: 1},
  {value: 'fromDate', title: 'LOYALTY_FEATURE.CONDITION_TYPE.FROM_DATE', limit: 1},
  {value: 'toDate', title: 'LOYALTY_FEATURE.CONDITION_TYPE.TO_DATE', limit: 1},
];

const pointsExpirePeriodType: OptionConfig[] = [
  {value: PeriodType.day, title: 'DAY'},
  {value: PeriodType.week, title: 'WEEK'},
  {value: PeriodType.month, title: 'MONTH'},
  {value: PeriodType.year, title: 'YEAR'},
];

const pointsExpireTrigger: OptionConfig[] = [
  {value: LoyaltyPointsExpireTrigger.accrual, title: 'LOYALTY_FEATURE.FROM_WHEN_ACCRUAL_THE_POINT_WAS_EARNED'},
  {value: LoyaltyPointsExpireTrigger.inactivity, title: 'LOYALTY_FEATURE.FROM_USER_INACTIVITY'},
];

const rulePointsType: OptionConfig[] = [
  {value: RulePointType.bonus, title: 'LOYALTY_FEATURE.RULE_POINT_TYPE.BONUS'},
  {value: RulePointType.multiplier, title: 'LOYALTY_FEATURE.RULE_POINT_TYPE.MULTIPLIER'},
];

@Injectable()
export class LoyaltyConfigService {
  constructor(private configService: ConfigService,
              private settingsService: SettingsService,
              private audiencesService: AudiencesService) {

  }

  public getLoyaltyManageConfig(): Observable<any> {
    return combineLatest(
      this.audiencesService.getAudiencesList(),
      this.configService.prepareStatusesLabel(),
    ).pipe(
      map(([pools]) => ({
        pools,
        matchType,
        pointsExpirePeriodType,
        pointsExpireTrigger
      }))
    );
  }

  public getLoyaltySetupRuleConfig(): Observable<any> {
    return combineLatest(
      this.settingsService.getCurrency()
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
        statusLabel
      }))
    );
  }

}
