import { IWMerchantAttributes, IWMerchantBranchAttributes, IJsonApiPostData, IJsonApiItem } from '@perx/whistler';

export class MerchantHttpAdapter {
  public static transformToMerchantForm(data: IWMerchantAttributes): IMerchantForm {
    return {
      name: data.name,
      type: data.type,
      id: data.id,
      createdAt: data.created_at,
      description: data.description,
      image: data.properties.logo_image,
      countryCode: data.properties.country_code,
      phone: data.properties.phone,
      address: data.properties.address,
      city: data.properties.city,
      state: data.properties.state,
      postalCode: data.properties.postal_code,
      weblink: data.properties.weblink,
      branches: data.branches ? data.branches.map(branch => (
        MerchantHttpAdapter.transformToBranches(branch)
      )) : []
    };
  }

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

  public static transformToBranches(branch: any): any {
    return {
      id: branch.id,
      name: branch.name,
      address: branch.properties.address,
      phone: branch.properties.phone
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
