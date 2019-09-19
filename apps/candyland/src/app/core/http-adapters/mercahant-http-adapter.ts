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
      prprobability: null,
      category: data.attributes.category
    };
  }

  public static transformToMerchantForm(data: any): any {
    return {
      name: data.attributes.name,
      id: data.id,
      currency: data.attributes.currency,
      rewardInfo: {
        image: data.attributes.image_url,
        rewardType: data.attributes.reward_type,
        category: data.attributes.category,
        redemptionType: data.attributes.redemption_type,
        cost: data.attributes.cost_of_reward,
        description: data.attributes.description,
        termsAndCondition: data.attributes.terms_conditions
      }
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

  public static transformFromMerchantBranchForm(id: string, data: any): any {
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
                id: id
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
