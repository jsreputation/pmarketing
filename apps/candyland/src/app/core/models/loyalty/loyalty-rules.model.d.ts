import { IWLoyaltyRuleConditionValueType } from '@perx/whistler';
import { RulePointType } from '@cl-core/models/loyalty/rule-point-type.enum';
import { RuleConditionType } from '@cl-core/models/loyalty/rule-condition-type.enum';
import { RuleOperatorType } from '@cl-core/models/loyalty/rule-operator-type.enum';

declare interface ILoyaltyRuleSet {
  id: string | null;
  matchType: string;
  tierType: string;
  tierId: string;
  rules?: ILoyaltyRule[];
}

declare interface ILoyaltyRule {
  id: string | null;
  priority: number;
  name: string;
  conditions?: ILoyaltyRuleCondition[];
  result: any;
}

declare interface ILoyaltyRuleCondition {
  id: string | null;
  type: RuleConditionType;
  value: string | Date | number | null;
  operator: RuleOperatorType;
  valueType: IWLoyaltyRuleConditionValueType;
}

declare interface ILoyaltyRulePoint {
  id: string | null;
  amount: number;
  type?: string;
  applierType: RulePointType;
}
