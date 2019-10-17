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
}
