import { IWMerchantAttributes, IWMerchantBranchAttributes, IJsonApiPostData, IJsonApiItem } from '@perx/whistler';
import { IMerchantForm } from '@cl-core/models/merchant/merchant-form-interface';
import { IBranch } from '@cl-core/models/merchant/branch-interface';

export class MerchantHttpAdapter {

  public static transformToMerchant(merchant: IJsonApiItem<IWMerchantAttributes>): Partial<IMerchantForm> {
    return {
      id: merchant.id,
      type: merchant.type,
      name: merchant.attributes.name,
      description: merchant.attributes.description,
      createdAt: merchant.attributes.created_at,
      image: merchant.attributes.properties.logo_image,
      countryCode: merchant.attributes.properties.country_code,
      phone: merchant.attributes.properties.phone,
      address: merchant.attributes.properties.address,
      city: merchant.attributes.properties.city,
      state: merchant.attributes.properties.state,
      postalCode: merchant.attributes.properties.postal_code,
      weblink: merchant.attributes.properties.weblink,
    };
  }

  public static transformToBranch(branch: IJsonApiItem<IWMerchantBranchAttributes>): IBranch {
    return {
      id: branch.id,
      type: branch.type,
      name: branch.attributes.name,
      properties: branch.attributes.properties,
      address: branch.attributes.properties ? branch.attributes.properties.address : null,
      phone: branch.attributes.properties ? branch.attributes.properties.phone : null,
    };
  }

  public static transformFromMerchantForm(data: IMerchantForm): IJsonApiPostData<IWMerchantAttributes> {
    return {
      type: 'orgs',
      attributes: {
        name: data.name,
        description: data.description,
        properties: {
          logo_image: data.image,
          country_code: data.countryCode,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          postal_code: data.postalCode,
          weblink: data.weblink
        }
      }
    };
  }

  public static transformFromMerchantBranchForm(data: IBranch, merchantId?: string): IJsonApiPostData<IWMerchantBranchAttributes> {
    return {
      type: 'branches',
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
            type: 'orgs',
            id: merchantId
          }
        }
      }
    };
  }
}
