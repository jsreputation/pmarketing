export class LoyaltyTierHttpAdapter {
  public static transformToTableData(data: any): ITableData<any> {
    const formatData = data.data.map((item) => {
      // const user = {};
        // SettingsHttpAdapter.transformToIAMUser(item);
      // if (data.included && data.included.length) {
      //   for (let i = 0; i <= data.included.length - 1; i++) {
      //     if (user.relationships_groups_id === data.included[i].id) {
      //       user.role = data.included[i].attributes.name;
      //       break;
      //     }
      //   }
      // }
      return {...item};
    });
    return { data: formatData, meta: data.meta};
  }
  //
  // public static transformFromLoyaltyBasicTierForm(data: any, type: string): any {
  //   return {
  //     type,
  //     attributes: {
  //       name: data.name,
  //       img_url: data.details.image,
  //       earn_ratio_money: data.tiersConversions.globalEarnRule.amount,
  //       earn_ratio_point: data.tiersConversions.globalEarnRule.points,
  //       burn_ratio_money: data.tiersConversions.globalBurnRule.amount,
  //       burn_ratio_point: data.tiersConversions.globalBurnRule.points,
  //       bonus_ratio: 50,
  //       discount_ratio: 20,
  //       expiry_period_type: data.tiersConversions.pointsExpiry.amount,
  //       expiry_period: data.tiersConversions.pointsExpiry.type,
  //       expiry_period_trigger: data.tiersConversions.pointsExpiry.trigger,
  //       join_method: LoyaltyTierHttpAdapter.getJoinMethod(data.details.joinMethod),
  //     }
  //   };
  // }
  //
  // public static transformFromLoyaltyCustomTierForm(data: any, type: string): any {
  //   return {
  //     type,
  //     attributes: {
  //       name: data.name,
  //       img_url: data.details.image,
  //       earn_ratio_money: data.tiersConversions.globalEarnRule.amount,
  //       earn_ratio_point: data.tiersConversions.globalEarnRule.points,
  //       burn_ratio_money: data.tiersConversions.globalBurnRule.amount,
  //       burn_ratio_point: data.tiersConversions.globalBurnRule.points,
  //       bonus_ratio: 50,
  //       discount_ratio: 20,
  //       expiry_period_type: data.tiersConversions.pointsExpiry.amount,
  //       expiry_period: data.tiersConversions.pointsExpiry.type,
  //       expiry_period_trigger: data.tiersConversions.pointsExpiry.trigger,
  //       join_method: LoyaltyTierHttpAdapter.getJoinMethod(data.details.joinMethod),
  //     }
  //   };
  // }
  //
  // private static getJoinMethod(data: any): any {
  //   const formatData = {
  //     invite_only: data.inviteOnly,
  //     sign_up: data.signUp,
  //     amount: data.amount,
  //     transaction_amount: data.transactionAmount,
  //   };
  //   return {invite_only: true, ...(!!formatData ? formatData : {})};
  // }
}
