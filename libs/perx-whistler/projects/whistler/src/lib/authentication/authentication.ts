export interface IMessageResponse {
  message: string;
  code?: number;
}

export interface IAppAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  created_at: number;
}

export interface ILoginResponse {
  bearer_token?: string;
}

export interface ILoginAttributes {
  account_id: string;
  time_zone: string;
  username: string;
}
