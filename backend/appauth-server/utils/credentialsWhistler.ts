import { ApiConfig, ICredentials } from '../types/apiConfig';
import { readFileSync } from 'fs';

export function getRootCredentials(): Promise<ICredentials> {
  const apiConfigPath = process.env.API_CONFIG_PATH || 'config.json';
  const apiConfig: ApiConfig = JSON.parse(readFileSync(apiConfigPath).toString());

  const rootEndpoint = apiConfig.root;
  if (rootEndpoint === undefined) {
    // throw new Error(`No root endpoints found`);
    console.log('No root endpoints found');
    return Promise.resolve({
      target_url: '',
      basic_token: '',
      perx_access_key_id: '',
      perx_secret_access_key: ''
    });
  }
  return Promise.resolve(rootEndpoint);
}
