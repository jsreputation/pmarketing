import { IJsonApiPostData } from '@perx/whistler';
import { ILogin } from '@cl-core/models/auth/login.interface';

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
}
