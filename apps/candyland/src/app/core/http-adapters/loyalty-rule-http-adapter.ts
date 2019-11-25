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
      domainType: data.attributes.domain_type,
      domainId: data.attributes.domain_id,
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
      matchType: data.attributes.match_type,
      domainType: data.attributes.domain_type,
      domainId: data.attributes.domain_id,
      rules: []
    };
  }

  public static transformFromRuleForm(data: any, basicTierId: string): IJsonApiItem<any> {
    return {
      type: 'custom_tiers',
      attributes: {
        name: data.name,
        image_url: data.imageUrl,
        bonus_ratio: (data.earnBonus / 100).toFixed(3),
        discount_ratio: (data.burnDiscount / 100).toFixed(3),
        expiry_period: data.pointsExpiry.amount,
        expiry_period_type: data.pointsExpiry.type,
        expiry_period_trigger: data.pointsExpiry.trigger
      },
      relationships: {
        basic_tier: {
          data: {
            type: 'basic_tiers',
            id: basicTierId
          }
        }
      }
    };
  }
}
