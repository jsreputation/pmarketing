import { IWLoyaltyRuleConditionSign, IWLoyaltyRuleConditionValueType, IWLoyaltyRulePointApplierType } from '@perx/whistler';

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
  amount: string;
  type?: string;
  applierType: IWLoyaltyRulePointApplierType;
}
