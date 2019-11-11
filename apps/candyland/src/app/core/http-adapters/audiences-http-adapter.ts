import { IWAssignedAttributes, IWAssignRequestAttributes, IWUser, IWPoolsApi, IWPools, IWAudiences } from '@perx/whistler';

export class AudiencesHttpAdapter {

  public static transformFromUserForm(data: IAudiencesUserForm): IJsonApiItem<Partial<IWUser>> {
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
      }
    };
    return Object.assign(mainUserApiObject, optionalPool);
  }

  public static transformUpdateUserPools(data: IWUser): IJsonApiItem<any> {
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

  public static transformUserWithPools(data: IJsonApiPayload<Partial<IWUser>>): IWUser {
    const poolMap = AudiencesHttpAdapter.createPoolMap(data.included);
    const userData = AudiencesHttpAdapter.transformUser(data.data);
    userData.pools = data.data.relationships.pools.data.map((item: IJsonApiItem<IWPoolsApi>) => poolMap[item.id]).sort().join(', ');
    return userData;
  }

  public static transformUsersWithPools(data: IJsonApiListPayload<Partial<IWUser>>): ITableData<IWUser> {
    const poolMap = AudiencesHttpAdapter.createPoolMap(data.included);
    const usersData = data.data.map((item: IJsonApiItem<Partial<IWUser>>) => {
      const formattedUser = AudiencesHttpAdapter.transformUser(item);
      formattedUser.pools = item.relationships.pools.data.map((pool: IJsonApiItem<IWPoolsApi>) => poolMap[pool.id]).sort().join(', ');
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
      type: 'assigneds',
      attributes: {
        source_id: source,
        source_type: 'Perx::Reward::Entity',
        assigned_to_id: assigned
      }
    };
  }

  public static transformVoucherPatchToApi(id: string, endData: string): IJsonApiItem<Partial<IWAssignedAttributes>> {
    return {
      id, type: 'assigneds',
      attributes: {
        valid_to: endData
      }
    };
  }

  private static transformUser(data: IJsonApiItem<Partial<IWUser>>): IWUser {
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
      pools: ''
    };
  }

  private static createPoolMap(data?: IJsonApiItem<IWPoolsApi>[]): IWPools {
    const mapPool = {};
    if (data) {
      data.forEach((element: IJsonApiItem<IWPoolsApi>) => {
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

  private static stringToDate(stringDate: string | null): Date | null {
    return stringDate ? new Date(stringDate) : null;
  }
}
