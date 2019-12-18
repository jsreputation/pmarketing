export interface IVStarConfig {
  perx_access_key_id: string;
  perx_secret_access_key: string;
  target_url: string;
}
export interface IWhistlerConfig {
  basic_token: string;
  target_url: string;
}

export interface ICredentials extends IVStarConfig, IWhistlerConfig { }

export interface ApiConfig {
  root: ICredentials;
  credentials: {
    [k: string]: ICredentials;
  };
  endpoints: {
    [k: string]: {
      account_id: string;
    };
  };
}
