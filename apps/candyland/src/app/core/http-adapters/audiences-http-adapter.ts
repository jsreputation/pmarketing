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
        properties: ''
      }
    };
    if (data.id) {
      res['id'] = data.id;
    }
    return res;
  }

  public static transformUser(data: IUserApi): IUser {
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
      primary_identifier: data.attributes.primary_identifier
    };
  }

  public static transformTableData(data: any): ITableData<IUser> {
    return {
      data: data.data.map(item => AudiencesHttpAdapter.transformUser(item)),
      meta: data.meta
    }
  }

  // Audiences List 
  public static transformAudiences(data: any): IAudiences {
    return {
      id: data.id,
      type: data.type,
      self: data.links.self,
      urn: data.attributes.urn,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      name: data.attributes.name,
      properties: data.attributes.properties
    };
  }

  public static transformAudiencesTableData(data: any): ITableData<IAudiences> {
    return {
      data: data.data.map(item => AudiencesHttpAdapter.transformAudiences(item)),
      meta: data.meta
    }
  }
}
