export class MerchantHttpAdapter {
  // tslint:disable
  public static transformToReward(data: IRewardEntityApi): IRewardEntity {
    return {
      id: data.id,
      image: data.attributes.image_url,
      name: data.attributes.name,
      type: data.type,
      rewardType: data.attributes.reward_type,
      redemptionType: data.attributes.redemption_type,
      current: data.attributes.cost_of_reward,
      total: 100,
      probability: null,
      category: data.attributes.category
    };
  }

  public static transformToMerchantForm(data: any): any {
    return {
      name: data.name,
      type: data.type,
      id: data.id,
      description: data.description,
      countryCode: data.properties.country_code,
      phone:  data.properties.phone,
      address:  data.properties.address,
      city:  data.properties.city,
      state: data.properties.state,
      postalCode: data.properties.postal_code,
      weblink: data.properties.weblink,
      // onBranches: !!data.branches,
      branches: data.branches ? data.branches.map(branch => (
        {
          id: branch.id,
          name: branch.name,
          address: branch.properties.address,
          phone: branch.properties.phone,
        }
        )) : []
    };
  };

  public static transformFromMerchantForm(data: any): any {
    return {
        type: 'orgs',
        attributes: {
          name: data.name,
          description: data.description,
          properties: {
            logo_image: 'https://lorempixel.com/300/300',
            country_code: data.countryCode,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            postal_code: data.postalCode,
            weblink: data.weblink,
          }
        }
    };
  }

  public static transformFromMerchantBranchForm(data: any, merchantId?: string): any {
    return {
          type: "branches",
          attributes: {
            name: data.name,
            properties: {
              phone: data.phone,
              address: data.address
            }
          },
          relationships: {
            org: {
              data: {
                type: "orgs",
                id: merchantId || data.id
              }
            }
        }
    }
  }




  public static transformFromReward(data: IRewardEntity): IRewardEntityApi {
    return {
        type: 'entities',
        attributes: {
          name: data.name,
          image_url: data.image,
          reward_type: data.rewardType,
          category: data.category,
          redemption_type: data.redemptionType,
          cost_of_reward: data.current,
        }
    };
  }
}
