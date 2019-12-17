import { ApiConfig, ICredentials } from '../types/apiConfig';
import { readFileSync } from 'fs';

export function getRootCredentials(): Promise<ICredentials> {
  const apiConfigPath = process.env.API_CONFIG_PATH || 'config.json';
  const apiConfig: ApiConfig = JSON.parse(readFileSync(apiConfigPath).toString());

  const rootEndpoint = apiConfig.root;
  if (rootEndpoint === undefined) {
    throw new Error(`No root endpoints found`);
  }
  return Promise.resolve(rootEndpoint);
}
