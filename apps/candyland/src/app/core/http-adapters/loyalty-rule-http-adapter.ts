import { JsonApiParser } from '@cl-helpers/json-api-parser';
import Utils from '@cl-helpers/utils';
import { ILoyaltyRule, ILoyaltyRuleCondition, ILoyaltyRulePoint, ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';
import {
  IWLoyaltyRuleAttributes,
  IWLoyaltyRuleConditionAttributes,
  IWLoyaltyRulePointAttributes,
  IWLoyaltyRuleSetAttributes,
  IJsonApiItem,
  IJsonApiListPayload
} from '@perx/whistler';
import { RulePointType } from '@cl-core/models/loyalty/rule-point-type.enum';
import { RuleSetMatchType } from '@cl-core/models/loyalty/rule-set-match-type.enum';
import { RuleConditionType } from '@cl-core/models/loyalty/rule-condition-type.enum';
import { RuleOperatorType } from '@cl-core/models/loyalty/rule-operator-type.enum';

export class LoyaltyRuleHttpAdapter {

  public static transformToList(data: any): any[] {
    return data.map((item) => LoyaltyRuleHttpAdapter.transformToRuleSetForm(item));
  }

  public static transformToRuleSetForm(data: IJsonApiItem<IWLoyaltyRuleSetAttributes>): ILoyaltyRuleSet {
    return {
      id: data.id,
      matchType: data.attributes.match_type,
      tierType: data.attributes.domain_type,
      tierId: data.attributes.domain_id,
      rules: []
    };
  }

  public static transformFromRuleSetFormCreate(typeTier: string, tierId: string): IJsonApiItem<IWLoyaltyRuleSetAttributes> {
    return {
      type: 'rule_sets',
      attributes: {
        domain_type: typeTier,
        domain_id: tierId,
        match_type: RuleSetMatchType.all
      }
    };
  }

  public static transformFromRuleSetFormUpdate(ruleSet: ILoyaltyRuleSet): IJsonApiItem<IWLoyaltyRuleSetAttributes> {
    return {
      type: 'rule_sets',
      id: ruleSet.id,
      attributes: {
        domain_type: ruleSet.tierType,
        domain_id: ruleSet.tierId,
        match_type: ruleSet.matchType,
        rules: ruleSet.rules.map(rule => LoyaltyRuleHttpAdapter.transformRuleForRuleSetUpdate(rule))
      }
    };
  }

  public static transformRuleForRuleSetUpdate(rule: ILoyaltyRule): { id: string; priority: number } {
    return {
      id: rule.id,
      priority: rule.priority
    };
  }

  public static transformToRuleForm(data: IJsonApiItem<IWLoyaltyRuleAttributes>): ILoyaltyRule {
    return {
      id: data.id,
      priority: data.attributes.priority,
      name: data.attributes.name,
      conditions: [],
      result: {}
    };
  }

  public static transformFromRuleForm(data: any, ruleSetId: string): IJsonApiItem<IWLoyaltyRuleAttributes> {
    return {
      type: 'rules',
      attributes: {
        rule_set_id: ruleSetId,
        reward_type: 'Perx::Loyalty::PointCalculator',
        reward_id: data.result.id,
        name: data.name,
        conditions: data.conditions.map(condition =>
          LoyaltyRuleHttpAdapter.transformFromCondition(condition)
        )
      }
    };
  }

  public static transformFromRuleFormUpdate(data: ILoyaltyRule): IJsonApiItem<IWLoyaltyRuleAttributes> {
    return {
      type: 'rules',
      attributes: {
        name: data.name,
      }
    };
  }

  public static transformToConditionForm(data: IJsonApiItem<IWLoyaltyRuleConditionAttributes>): ILoyaltyRuleCondition {
    return {
      id: data.id,
      type: RuleConditionType[data.attributes.field],
      value: data.attributes.value,
      operator: RuleOperatorType[data.attributes.sign],
      valueType: data.attributes.value_type
    };
  }

  public static transformFromCondition(data: ILoyaltyRuleCondition): IWLoyaltyRuleConditionAttributes {
    return {
      field: data.type,
      sign: data.operator,
      value: (data.valueType === 'date') ? new Date(data.value) : data.value,
      value_type: data.valueType
    };
  }

  public static transformFromConditionForm(data: ILoyaltyRuleCondition, ruleId: string): IJsonApiItem<IWLoyaltyRuleConditionAttributes> {
    return {
      type: 'rule_conditions',
      attributes: LoyaltyRuleHttpAdapter.transformFromCondition(data),
      relationships: {
        rule: {
          data: {
            type: 'rules',
            id: ruleId
          }
        }
      }
    };
  }

  public static transformFromPointForm(data: ILoyaltyRulePoint): IJsonApiItem<IWLoyaltyRulePointAttributes> {
    return {
      type: data.type || 'point_calculators',
      attributes: {
        amount: data.amount.toFixed(0),
        applier_type: data.applierType
      },
    };
  }

  public static transformToPointForm(data: IJsonApiItem<IWLoyaltyRulePointAttributes>): ILoyaltyRulePoint {
    return {
      id: data.id,
      amount: +data.attributes.amount,
      applierType: data.attributes.applier_type as RulePointType
    };
  }

  public static transformPossibleOutcome(data: IJsonApiItem<any>): any {
    return {
      id: data.attributes.result_id,
      type: data.attributes.result_type,
    };
  }

  public static transformFromRuleSetWithIncludes(
    data: IJsonApiListPayload<IWLoyaltyRuleSetAttributes>,
    outcomesIncludes: { [outcomeId: string]: ILoyaltyRulePoint } = null
  ): ILoyaltyRuleSet {
    let formattedData = JsonApiParser.parseDataWithIncludes(data, LoyaltyRuleHttpAdapter.transformToRuleSetForm,
      { rules: { fieldName: 'rules' } });
    if (Utils.isArray(formattedData)) {
      formattedData = formattedData[0];
    }
    const conditionsIncludes = JsonApiParser.getMapIncludes(data, 'rule_conditions', LoyaltyRuleHttpAdapter.transformToConditionForm);
    formattedData.rules = formattedData.rules.map((rule) => {
      const formattedRule = LoyaltyRuleHttpAdapter.transformToRuleForm(rule);
      const conditions = JsonApiParser.findRelations(rule, 'rule_conditions', conditionsIncludes);
      if (conditions) {
        formattedRule.conditions = conditions;
      }
      if (!outcomesIncludes) {
        return formattedRule;
      }
      const outcomes = JsonApiParser.findRelations(rule, 'possible_outcomes', outcomesIncludes);
      if (outcomes && outcomes[0]) {
        formattedRule.result = outcomes[0];
      }
      return formattedRule;
    });
    return formattedData;
  }
}
