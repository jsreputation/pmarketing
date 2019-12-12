import { IWLoyaltyRuleConditionSign, IWLoyaltyRuleConditionValueType } from '@perx/whistler';

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

export interface ILoyaltyRuleCondition {
  id: string;
  type: string;
  value: string | Date | number | null;
  operator: IWLoyaltyRuleConditionSign;
  valueType: IWLoyaltyRuleConditionValueType;
}
