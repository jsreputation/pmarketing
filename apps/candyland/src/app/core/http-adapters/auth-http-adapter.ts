import { IJsonApiPostData } from '@perx/whistler';

export class AuthHttpAdapter {
  public static transformFromLogin(data: ILogin): IJsonApiPostData<ILogin> {
    return {
      attributes: {
        account_id: data.account_id,
        username: data.username,
        password: data.password
      }
    };
  }
}
