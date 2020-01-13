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
            id: data.tierId
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

  public static transformFromLoyaltyCard(data: any): IJsonApiPostData<IWLoyaltyCard> | IJsonApiPatchData<IWLoyaltyCard> {
    const updatedData: IJsonApiPostData<IWLoyaltyCard> | IJsonApiPatchData<IWLoyaltyCard> = {
      type: 'cards',
      attributes: {
        user_id: data.userId,
        balance: data.balance,
      }
    };

    if (data.loyalty) {
      updatedData.relationships.program.data = {
        type: 'programs',
        id: data.loyalty.id
      };
    }

    if (data.tier) {
      updatedData.relationships.tier.data = {
        type: data.tier.type,
        id: data.tierId
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
