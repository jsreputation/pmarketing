export interface VStarConfig {
  perx_access_key_id: string;
  perx_secret_access_key: string;
  target_url: string;
}
export interface WhistlerConfig {
  basic_token: string;
  target_url: string;
}

export interface ICredentials extends VStarConfig, WhistlerConfig { }

export interface ApiConfig {
  credentials: {
    [k: string]: ICredentials;
  };
  endpoints: {
    [k: string]: {
      account_id: string;
    };
  };
}
