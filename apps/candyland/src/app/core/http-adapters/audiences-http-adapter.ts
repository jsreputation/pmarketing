import { IAssignedAttributes, IAssignRequestAttributes } from '@perx/whistler';

export class AudiencesHttpAdapter {

  public static transformFromUserForm(data: IAudiencesUserForm): IJsonApiItem<IUserApi> {
    const optionalPool = data.audienceList ? { relationships: { pools: {data: data.audienceList}}} : {};
    const mainUserApiObject = {
        type: 'users',
        attributes: {
        title: data.firstName + ' ' + data.lastName,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phone,
        email_address: data.email,
        primary_identifier: data.firstName + 'identifier',
    }};
    return Object.assign(mainUserApiObject, optionalPool);

  }

  public static transformUpdateUserPools(data: IUser): IJsonApiItem<any> {
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

  public static transformUserWithPools(data: IJsonApiPayload<IUserApi>): IUser {
    const poolMap = AudiencesHttpAdapter.createPoolMap(data.included);
    const userData = AudiencesHttpAdapter.transformUser(data.data);
    userData.pools = data.data.relationships.pools.data.map((item: IJsonApiItem<IPoolsApi>) => poolMap[item.id]).sort().join(', ');
    return userData;
  }

  public static transformUsersWithPools(data: IJsonApiListPayload<IUserApi>): ITableData<IUser> {
    const poolMap = AudiencesHttpAdapter.createPoolMap(data.included);
    const usersData = data.data.map((item: IJsonApiItem<IUserApi>) => {
      const formattedUser = AudiencesHttpAdapter.transformUser(item);
      formattedUser.pools = item.relationships.pools.data.map((pool: IJsonApiItem<IPoolsApi>) => poolMap[pool.id]).sort().join(', ');
      return formattedUser;
    });
    return {
      data: usersData, meta: data.meta
    };
  }

  public static transformAudiencesTableData(data: any): ITableData<IAudiences> {
    return {
      data: data.data.map(item => AudiencesHttpAdapter.transformAudiences(item)), meta: data.meta
    };
  }

  public static transformAudiencesVoucher(data: IJsonApiItem<IAssignedAttributes>): Partial<IAudienceVoucher> {
    return {
      id: data.id,
      endDate: data.attributes.end_date,
      rewardId: data.attributes.source_id.toString(),
      issuedDate: AudiencesHttpAdapter.stringToDate(data.attributes.start_date),
      expiryDate: AudiencesHttpAdapter.stringToDate(data.attributes.end_date), status: data.attributes.status
    };
  }

  public static transformVoucherAssignedToApi(source: string, assigned: string): IJsonApiItem<IAssignRequestAttributes> {
    return {
      type: 'assigneds',
      attributes: {
        source_id: source,
        source_type: 'Perx::Reward::Entity',
        assigned_to_id: assigned
      }
    };
  }

  public static transformVoucherPatchToApi(id: string, endData: string): IJsonApiItem<Partial<IAssignedAttributes>> {
    return {
      id, type: 'assigneds',
      attributes: {
        end_date: endData
      }
    };
  }

  private static transformUser(data: IJsonApiItem<IUserApi>): IUser {
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

  private static createPoolMap(data?: IJsonApiItem<IPoolsApi>[]): IPools {
    const mapPool = {};
    if (data) {
      data.forEach((element: IJsonApiItem<IPoolsApi>) => {
        mapPool[element.id] = element.attributes.name;
      });
    }
    return mapPool;
  }

  // Audiences List
  private static transformAudiences(data: any): IAudiences {
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
