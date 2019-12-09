import { JsonApiParser } from '@cl-helpers/json-api-parser';
import Utils from '@cl-helpers/utils';
import { ILoyaltyRule, ILoyaltyRuleCondition, ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';
import { IWLoyaltyRuleAttributes, IWLoyaltyRuleConditionAttributes, IWLoyaltyRuleSetAttributes } from '@perx/whistler';

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

  public static transformFromRuleSetForm(typeTier: string, tierId: string): IJsonApiItem<IWLoyaltyRuleSetAttributes> {
    return {
      type: 'rule_sets',
      attributes: {
        domain_type: typeTier,
        domain_id: tierId,
        match_type: 'match_all'
      }
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
        reward_type: 'Perx::Reward::Entity',
        reward_id: 1,
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
      type: data.attributes.field,
      value: data.attributes.value,
      operator: data.attributes.sign,
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

  public static transformFromRuleSetWithIncludes(data: IJsonApiListPayload<IWLoyaltyRuleSetAttributes>): ILoyaltyRuleSet {
    let formattedData = JsonApiParser.parseDataWithIncludes(data, LoyaltyRuleHttpAdapter.transformToRuleSetForm,
      {rules: {fieldName: 'rules'}});
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
      return formattedRule;
    });
    return formattedData;
  }
}
