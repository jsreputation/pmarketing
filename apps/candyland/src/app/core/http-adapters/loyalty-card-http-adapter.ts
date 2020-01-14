import {
  IWLoyaltyAttributes,
  IJsonApiItem,
  IJsonApiPostData,
  IWLoyaltyCard, IJsonApiPatchData
} from '@perx/whistler';

export class LoyaltyCardHttpAdapter {

  public static transformFromCreateLoyaltyCard(data: any): IJsonApiPostData<IWLoyaltyCard> {
    return {
      type: 'cards',
      attributes: {
        user_id: data.userId,
        balance: data.balance,
      },
      relationships: {
        tier: {
          data: {
            type: data.tier.type,
            id: data.tier.id
          }
        },
        program: {
          data: {
            type: 'programs',
            id: data.loyalty.id
          }
        }
      }
    };
  }

  public static transformFromUpdateLoyaltyCard(data: any): IJsonApiPatchData<IWLoyaltyCard> {
    const updatedData: IJsonApiPatchData<IWLoyaltyCard> = {
      id: data.id,
      type: 'cards',
      attributes: {}
    };

    if ('balance' in data) {
      updatedData.attributes.balance = data.balance;
    }

    // if ('loyalty' in data) {
    //   updatedData.relationships.program.data = {
    //     type: 'programs',
    //     id: data.loyalty.id
    //   };
    // }

    if ('tier' in data) {
      updatedData.relationships = {
        tier: {
          data: {
            type: data.tier.type,
            id: data.tier.id
          }
        }
      };
    }

    return updatedData;
  }

  public static transformToLoyaltyCard(data: IJsonApiItem<IWLoyaltyCard>): any {
    return {
      id: data.id,
      userId: data.attributes.user_id,
      balance: data.attributes.balance,
      tier: {
        id: data.attributes.tier_id,
        type: data.attributes.tier_type,
      }
    };
  }

  public static transformToIncludeLoyalty(data: IJsonApiItem<IWLoyaltyAttributes>): any {
    return {
      id: data.id,
      name: data.attributes.name,
    };
  }
}
