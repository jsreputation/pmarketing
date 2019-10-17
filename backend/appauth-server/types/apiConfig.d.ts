export interface VStarConfig {
  perx_access_key_id: string;
  perx_secret_access_key: string;
}
export interface WhistlerConfig {
  basic_token: string;
}

// declare interface BECOnfig = VStarConfig & WhistlerConfig;

export interface ApiConfig {
  credentials: {
    [k: string]: (VStarConfig & WhistlerConfig);
  };
  endpoints: {
    [k: string]: {
      target_url: string;
      account_id: string;
    };
  };
}
