import { JsonApiParser } from '@cl-helpers/json-api-parser';
import Utils from '@cl-helpers/utils';

export class LoyaltyRuleHttpAdapter {

  // public static transformToLoyalties(data: any): { data: any[] } {
  //   const formatData = data.data.map((item) => {
  //     let formLoyalty = LoyaltyRuleHttpAdapter.transformToLoyaltyForm(item);
  //     formLoyalty = LoyaltyRuleHttpAdapter.setIncludedToLoyaltyForm(data, item, formLoyalty);
  //     return formLoyalty;
  //   });
  //   return {data: formatData};
  // }
  //
  // public static transformToTableData(data: any): ITableData<any> {
  //   const formatData = data.data.map((item) => {
  //     let formLoyalty = LoyaltyRuleHttpAdapter.transformToLoyaltyForm(item);
  //     formLoyalty = LoyaltyRuleHttpAdapter.setIncludedToLoyaltyForm(data, item, formLoyalty);
  //     return formLoyalty;
  //   });
  //   return {data: formatData, meta: data.meta};
  // }

  public static transformToList(data: any): any[] {
    return data.map((item) => LoyaltyRuleHttpAdapter.transformToRuleSetForm(item));
  }

  public static transformToRuleSetForm(data: IJsonApiItem<any>): any {
    return {
      id: data.id,
      matchType: data.attributes.match_type,
      tierType: data.attributes.domain_type,
      tierId: data.attributes.domain_id,
      rules: []
    };
  }

  public static transformFromRuleSetForm(typeTier: string, tierId: string): IJsonApiItem<any> {
    return {
      type: 'rule_sets',
      attributes: {
        domain_type: typeTier,
        // 'Perx::Loyalty::BasicTier',
        domain_id: tierId,
        match_type: 'match_all'
      }
      // relationships: {
      //   basic_tier: {
      //     data: {
      //       type: 'basic_tiers'
      //     }
      //   }
      // }
    };
  }

  public static transformToRuleForm(data: IJsonApiItem<any>): any {
    return {
      id: data.id,
      priority: data.attributes.priority,
      name: data.attributes.name,
      conditions: [],
      result: {}
    };
  }

  public static transformFromRuleForm(data: any, ruleSetId: string): IJsonApiItem<any> {
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

  public static transformToConditionForm(data: any): any {
    return {
      id: data.id,
      type: data.attributes.field,
      value: data.attributes.value,
      operator: data.attributes.sign,
      valueType: data.attributes.value_type
    };
  }

  public static transformFromCondition(data: any): any {
    return {
      field: data.type,
      sign: data.operator,
      value: (data.valueType === 'date') ? new Date(data.value) : data.value,
      value_type: data.valueType
    };
  }

  public static transformFromConditionForm(data: any, ruleId: string): any {
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

  public static transformFromRuleSetWithIncludes(data: any): any {
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
