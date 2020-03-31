import {
  IWLoyaltyAttributes,
  IJsonApiItem,
  IJsonApiPostData,
  IWLoyaltyCard,
  IJsonApiPatchData,
  IWCustomTierAttributes,
  IWBasicTierAttributes
} from '@perxtech/whistler';
import { IAudiencesLoyalty, IAudiencesLoyaltyCard, IAudiencesTier } from '@cl-core/models/audiences/audiences-loyalty.model';

export class LoyaltyCardHttpAdapter {
  public static transformFromCreateLoyaltyCard(data: IAudiencesLoyaltyCard): IJsonApiPostData<IWLoyaltyCard> {
    return {
      type: 'cards',
      attributes: {
        user_id: data.userId,
        balance: `${data.balance}`,
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
      updatedData.attributes.balance = `${data.balance} `;
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
    };
  }

  public static transformToIncludeLoyalty(data: IJsonApiItem<IWLoyaltyAttributes>): IAudiencesLoyalty {
    return {
      id: data.id,
      name: data.attributes.name,
    };
  }

  public static transformToIncludeLoyaltyTier(data: IJsonApiItem<IWBasicTierAttributes | IWCustomTierAttributes>): IAudiencesTier {
    return {
      id: data.id,
      type: data.type,
      name: ('name' in data.attributes) ? data.attributes.name : 'Basic Tier',
      imageUrl: data.attributes.image_url
    };
  }
}
