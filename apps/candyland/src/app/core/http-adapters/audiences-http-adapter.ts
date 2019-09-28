export class AudiencesHttpAdapter {
  // tslint:disable
  public static transformCreateUser(data: any): any {
    const res = {
      type: 'users',
      attributes: {
        title: 'Test' + data.firstName + data.lastName,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phone,
        email_address: data.email,
        primary_identifier: data.firstName + 'identifier',
        properties: '',
      },
      relationships: {
        pools: {
          data: data.audienceList
        }
      }
    };
    if (data.id) {
      res['id'] = data.id;
    }
    return res;
  }

  public static transformUpdateUserPools(data: any): any {
    const res = {
      type: data.type,
      id: data.id,
      relationships: {
        pools: {
          data: data.pools
        }
      }
    };
    return res;
  }

  private static transformUser(data: IUserApi): IUser {
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

  public static transformUserWithPools(data: IUserWithIncludes<IUserApi>): IUser {
    const poolMap = AudiencesHttpAdapter.createPoolMap(data.included);
    const userData = AudiencesHttpAdapter.transformUser(data.data);
    userData.pools = data.data.relationships.pools.data.map((item: IPoolsApi) => poolMap[item.id]).join(', ');
    return userData;
  }

  private static createPoolMap(data?: IPoolsApi[]): IPools {
    const mapPool = {};
    if (data) {
      data.forEach((element: IPoolsApi) => {
        mapPool[element.id] = element.attributes.name;
      });
    }
    return mapPool;
  }

  public static transformTableData(data: any): ITableData<IUser> {
    return {
      data: data.data.map(item => AudiencesHttpAdapter.transformUser(item)),
      meta: data.meta
    }
  }

  public static transformUsersWithPools(data: IUsersWithIncludes<IUserApi>): IUsersWithPoolsData<IUser> {
    const poolMap = AudiencesHttpAdapter.createPoolMap(data.included);
    const usersData = data.data.map((item: IUserApi) => {
      const formatedUser = AudiencesHttpAdapter.transformUser(item);
      formatedUser.pools = item.relationships.pools.data.map((item: IPoolsApi) => poolMap[item.id]).join(', ');
      return formatedUser
    });
    return {
      data: usersData,
      meta: data.meta
    }
  }

  // Audiences List
  private static transformAudiences(data: any): IAudiences {
    return {
      id: data.id,
      type: data.type,
      self: data.links.self,
      urn: data.attributes.urn,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      name: data.attributes.name,
      properties: data.attributes.properties,
      users: data.relationships.users.data
    };
  }

  // private static transformAudiencesUser(data: any): IAUser {
  //   return {
  //     id: data.relationships.users.data.id,
  //     type: data.relationships.users.data.type,
  //     self: data.relationships.users.data.links.self,
  //     urn: data.relationships.users.data.attributes.urn,
  //     created_at: data.relationships.users.data.attributes.created_at,
  //     updated_at: data.relationships.users.data.attributes.updated_at,
  //     title: data.relationships.users.data.attributes.title,
  //     first_name: data.relationships.users.data.attributes.first_name,
  //     last_name: data.relationships.users.data.last_name,
  //     phone_number: data.relationships.users.data.phone_number,
  //     email_address: data.relationships.users.data.email_address,
  //     primary_identifier: data.relationships.users.data.primary_identifier
  //   };
  // }

  public static transformAudiencesTableData(data: any): ITableData<IAudiences> {
    return {
      data: data.data.map(item => AudiencesHttpAdapter.transformAudiences(item)),
      meta: data.meta
    }
  }

  public static transformAudiencesVoucher(data: any): any {
    return {
      id: data.id,
      batchId: data.attributes.batch_id,
      endDate: data.attributes.end_date,
      rewardId: data.attributes.source_id,
      issuedDate: AudiencesHttpAdapter.stringToDate(data.attributes.start_date),
      expiryDate: AudiencesHttpAdapter.stringToDate(data.attributes.end_date),
      status: data.attributes.status,
    }
  }

  private static stringToDate(stringDate: string | null): Date | null {
    return stringDate ? new Date(stringDate) : null;
  }

  public static transformVoucherAssignedToApi(sourse: string, assigned: string): any {
    return {
      type: "assigneds",
        attributes: {
        source_id: sourse,
        source_type: "Perx::Reward::Entity",
        assigned_to_id: assigned
      }
    }
  }
}
