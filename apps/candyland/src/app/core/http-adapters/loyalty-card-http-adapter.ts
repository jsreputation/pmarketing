import {
  IWLoyaltyAttributes,
  IJsonApiItem,
  IJsonApiPostData,
  IWLoyaltyCard, IJsonApiPatchData
} from '@perx/whistler';
import { IAudiencesLoyalty, IAudiencesLoyaltyCard } from '@cl-core/models/audiences/audiences-loyalty.model';

export class LoyaltyCardHttpAdapter {

  public static transformFromCreateLoyaltyCard(data: IAudiencesLoyaltyCard): IJsonApiPostData<IWLoyaltyCard> {
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

  public static transformFromUpdateLoyaltyCard(data: IAudiencesLoyaltyCard): IJsonApiPatchData<IWLoyaltyCard> {
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
        name: 'Basic Tier',
        imageUrl: 'https://cdn.uat.whistler.perxtech.io/dev1/tenants/222222222/skv1sie9ddcytyt7v7wqst9u7g61'
      }
    };
  }

  public static transformToIncludeLoyalty(data: IJsonApiItem<IWLoyaltyAttributes>): IAudiencesLoyalty {
    return {
      id: data.id,
      name: data.attributes.name,
    };
  }
}
