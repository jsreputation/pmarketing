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
          LoyaltyRuleHttpAdapter.transformFromFromConditionForm(condition)
        )
      }
    };
  }

  public static transformFromToConditionForm(data: any): any {
    return {
      type: data.field,
      value: data.value,
      operator: data.sign,
      valueType: data.value_type
    };
  }

  public static transformFromFromConditionForm(data: any): any {
    return {
      field: data.type,
      sign: data.operator,
      value: data.value,
      value_type: data.valueType
    };
  }
}
