import {
  IWAssignedAttributes,
  IWAssignRequestAttributes,
  IWProfileAttributes,
  IWCustomProperties,
  IWPoolsAttributes,
  IWAudiences,
  IWPools
} from '@perx/whistler';
import { SOURCE_TYPE } from '../../app.constants';

export class AudiencesHttpAdapter {

  public static transformFromUserForm(data: IAudiencesUserForm): IJsonApiItem<IWProfileAttributes> {
    const optionalPool = data.audienceList ? { relationships: { pools: { data: data.audienceList } } } : {};
    const mainUserApiObject = {
      type: 'users',
      attributes: {
        title: data.firstName + ' ' + data.lastName,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phone,
        email_address: data.email,
        primary_identifier: data.firstName + 'identifier',
        properties: AudiencesHttpAdapter.transformCustomProps(data),
      }
    };
    return Object.assign(mainUserApiObject, optionalPool);
  }

  public static transformUpdateUserPools(data: IWProfileAttributes): IJsonApiItem<any> {
    return {
      type: data.type,
      id: data.id,
      attributes: {},
      relationships: {
        pools: {
          data: data.pools
        }
      }
    };
  }

  public static transformUserWithPools(data: IJsonApiPayload<IWProfileAttributes>): IWProfileAttributes {
    const poolMap = AudiencesHttpAdapter.createPoolMap(data.included);
    const userData = AudiencesHttpAdapter.transformUser(data.data);
    userData.pools = data.data.relationships.pools.data.map((item: IJsonApiItem<IWPoolsAttributes>) => poolMap[item.id]).sort().join(', ');
    return userData;
  }

  public static transformUsersWithPools(data: IJsonApiListPayload<IWProfileAttributes>): ITableData<IWProfileAttributes> {
    const poolMap = AudiencesHttpAdapter.createPoolMap(data.included);
    const usersData = data.data.map((item: IJsonApiItem<IWProfileAttributes>) => {
      const formattedUser = AudiencesHttpAdapter.transformUser(item);
      formattedUser.pools = item.relationships.pools.data.map(
        (pool: IJsonApiItem<IWPoolsAttributes>) => poolMap[pool.id]).sort().join(', ');
      return formattedUser;
    });
    return {
      data: usersData, meta: data.meta
    };
  }

  public static transformAudiencesTableData(data: any): ITableData<IWAudiences> {
    return {
      data: data.data.map(item => AudiencesHttpAdapter.transformAudiences(item)), meta: data.meta
    };
  }

  public static transformAudiencesVoucher(data: IJsonApiItem<IWAssignedAttributes>): Partial<IAudienceVoucher> {
    return {
      id: data.id,
      endDate: data.attributes.valid_to,
      rewardId: data.attributes.source_id.toString(),
      issuedDate: AudiencesHttpAdapter.stringToDate(data.attributes.valid_from),
      expiryDate: AudiencesHttpAdapter.stringToDate(data.attributes.valid_to), status: data.attributes.status
    };
  }

  public static transformVoucherAssignedToApi(source: string, assigned: string): IJsonApiItem<IWAssignRequestAttributes> {
    return {
      type: 'vouchers',
      attributes: {
        source_id: source,
        source_type: SOURCE_TYPE,
        assigned_to_id: assigned
      }
    };
  }

  public static transformVoucherPatchToApi(id: string, endData: string): IJsonApiItem<Partial<IWAssignedAttributes>> {
    return {
      id,
      type: 'vouchers',
      attributes: {
        valid_to: endData
      }
    };
  }

  private static transformUser(data: IJsonApiItem<IWProfileAttributes>): IWProfileAttributes {
    return {
      id: data.id,
      type: data.type,
      self: data.links.self,
      urn: data.attributes.urn,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      title: data.attributes.title,
      first_name: data.attributes.first_name,
      last_name: data.attributes.last_name,
      phone_number: data.attributes.phone_number,
      email_address: data.attributes.email_address,
      primary_identifier: data.attributes.primary_identifier,
      properties: AudiencesHttpAdapter.transformProps(data.attributes),
      pools: ''
    };
  }

  private static createPoolMap(data?: IJsonApiItem<IWPoolsAttributes>[]): IWPools {
    const mapPool = {};
    if (data) {
      data.forEach((element: IJsonApiItem<IWPoolsAttributes>) => {
        mapPool[element.id] = element.attributes.name;
      });
    }
    return mapPool;
  }

  // Audiences List
  private static transformAudiences(data: any): IWAudiences {
    return {
      id: data.id, type: data.type, self: data.links.self, urn: data.attributes.urn,
      created_at: data.attributes.created_at, updated_at: data.attributes.updated_at, name: data.attributes.name,
      properties: data.attributes.properties, users: data.relationships.users.data
    };
  }

  private static transformCustomProps(formData: IAudiencesUserForm | null): IWCustomProperties | null {
    if (!formData) {
      return null;
    }

    return {
      gender: formData.gender || null,
      birthday: formData.birthday ? formData.birthday.toString() : null,
      race: formData.race || null,
      country: formData.country || null,
      nationality: formData.nationality || null,
      city: formData.city || null,
      state: formData.state || null,
    };
  }

  private static transformProps(attributes: IWProfileAttributes | null): IWCustomProperties | null {
    if (!attributes) {
      return null;
    }

    const { properties } = attributes;
    if (!properties) {
      return null;
    }

    return {
      gender: properties.gender || null,
      birthday: properties.birthday || null,
      race: properties.race || null,
      country: properties.country || null,
      nationality: properties.nationality || null,
      city: properties.city || null,
      state: properties.state || null,
    };
  }

  private static stringToDate(stringDate: string | null): Date | null {
    return stringDate ? new Date(stringDate) : null;
  }
}
