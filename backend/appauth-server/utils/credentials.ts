import { ApiConfig, ICredentials } from '../types/apiConfig';
import { readFileSync } from 'fs';

export function getCredentials(url: string): Promise<ICredentials> {
  const apiConfigPath = process.env.API_CONFIG_PATH || 'config.json';
  const apiConfig: ApiConfig = JSON.parse(readFileSync(apiConfigPath).toString());

  const endpoint = apiConfig.endpoints[url];
  if (endpoint === undefined) {
    throw new Error(`tenant credentials not found`);
  }
  return Promise.resolve(apiConfig.credentials[endpoint.account_id]);
}
