export class LoyaltyHttpAdapter {
  public static transformToTableData(data: any): ITableData<any> {
    const formatData = data.data.map((item) => {
      // const user = SettingsHttpAdapter.transformToIAMUser(item);
      // const user = {};
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

  public static transformFromLoyaltyForm(data: any): any {
      return {
      type: 'entities',
      attributes: {
        name: data.name,
        img_url: data.details.image,
        earn_ratio_money: data.tiersConversions.globalEarnRule.amount,
        earn_ratio_point: data.tiersConversions.globalEarnRule.points,
        burn_ratio_money: data.tiersConversions.globalBurnRule.amount,
        burn_ratio_point: data.tiersConversions.globalBurnRule.points,
        bonus_ratio: 50,
        discount_ratio: 20,
        expiry_period_type: data.tiersConversions.pointsExpiry.amount,
        expiry_period: data.tiersConversions.pointsExpiry.type,
        expiry_period_trigger: data.tiersConversions.pointsExpiry.trigger,
        join_method: LoyaltyHttpAdapter.getJoinMethod(data.details.joiningMethod),
        pool_id: data.details.poolId
      }
    };
  }

  private static getJoinMethod(data: any): any {
    const formatData = {
      invite_only: data.byInvite,
      sign_up: data.signUp,
      amount: data.amount,
      transaction_amount: data.transactionAmount,
    };
    return {invite_only: true, ...(!!formatData ? formatData : {})};
  }
}
