import { IJsonApiItemPayload, IJsonApiPostData, IWProfileAttributes } from '@perx/whistler';
import { IAMUser } from '@cl-core/models/settings/IAMUser.interface';

export class AuthHttpAdapter {
  public static transformFromLogin(data: ILogin): Partial<IJsonApiPostData<ILogin>> {
    return {
      attributes: {
        account_id: data.account_id,
        username: data.username,
        password: data.password
      }
    };
  }

  public static transformToUser(data: any): Partial<IAMUser> {
    return {
      id: data.id,
      type: data.type,
      email: data.attributes.email,
      username: data.attributes.username,
      time_zone:  data.attributes.time_zone,
      created_at: data.attributes.created_at,
      update_at: data.attributes.updated_at
    };
  }
}
