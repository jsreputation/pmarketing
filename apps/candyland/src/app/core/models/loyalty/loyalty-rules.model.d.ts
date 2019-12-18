import { IWLoyaltyRuleConditionSign, IWLoyaltyRuleConditionValueType } from '@perx/whistler';
import { RulePointType } from '@cl-core/models/loyalty/rule-point-type.enum';

declare interface ILoyaltyRuleSet {
  id: string;
  matchType: string;
  tierType: string;
  tierId: string;
  rules?: ILoyaltyRule[];
}

declare interface ILoyaltyRule {
  id: string;
  priority: number;
  name: string;
  conditions?: ILoyaltyRuleCondition[];
  result: any;
}

declare interface ILoyaltyRuleCondition {
  id: string;
  type: string;
  value: string | Date | number | null;
  operator: IWLoyaltyRuleConditionSign;
  valueType: IWLoyaltyRuleConditionValueType;
}

declare interface ILoyaltyRulePoint {
  id: string;
  amount: number;
  type?: string;
  applierType: RulePointType;
}
