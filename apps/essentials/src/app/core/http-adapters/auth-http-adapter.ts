import { IJsonApiPostData } from '@perx/whistler';

export class AuthHttpAdapter {
  public static transformFromLogin(data: ILogin): Partial<IJsonApiPostData<ILogin>> {
    return {
      attributes: {
        account_id: 'retail',
        username: data.username,
        password: data.password
      }
    };
  }
}
