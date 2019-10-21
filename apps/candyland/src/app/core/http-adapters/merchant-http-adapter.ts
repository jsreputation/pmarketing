import { MerchantBranch } from './merchant';
import { IMerchantApi, IMerchantBranchApi} from '@perx/whistler';

export class MerchantHttpAdapter {
  public static transformToMerchantForm(data: IMerchantApi): IMerchantForm {
    return {
      name: data.name,
      type: data.type,
      id: data.id,
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
        {
          id: branch.id,
          name: branch.name,
          address: branch.properties.address,
          phone: branch.properties.phone
        }
      )) : []
    };
  }

  public static transformFromMerchantForm(data: IMerchantForm): IJsonApiItem<IMerchantApi> {
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

  public static transformFromMerchantBranchForm(data: MerchantBranch, merchantId?: string): IJsonApiItem<IMerchantBranchApi> {
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
            id: merchantId || data.id
          }
        }
      }
    };
  }
}
