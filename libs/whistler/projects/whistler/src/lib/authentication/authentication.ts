export interface IWMessageResponse {
  message: string;
  code?: number;
}

export interface IWAppAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  created_at: number;
}

export interface IWLoginResponse {
  bearer_token?: string;
}

export interface IWLoginAttributes {
  account_id: string;
  time_zone: string;
  username: string;
}
