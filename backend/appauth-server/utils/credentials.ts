import {
  ApiConfig,
  ICredentials
} from '../types/apiConfig';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import { join } from 'path';

const EXPRESS_DIST_FOLDER = join(__dirname);

export function getCredentials(url: string): Promise<ICredentials> {
  const localConfigPath: string = join(EXPRESS_DIST_FOLDER, `/config.json`);
  const apiConfigPath: string = process.env.API_CONFIG_PATH ? process.env.API_CONFIG_PATH :
    fs.existsSync(localConfigPath) ? localConfigPath : '';
  const apiConfig: ApiConfig = JSON.parse(readFileSync(apiConfigPath).toString());

  const endpoint = apiConfig.endpoints[url];
  if (endpoint === undefined) {
    throw new Error('tenant credentials not found');
  }
  return Promise.resolve(apiConfig.credentials[endpoint.account_id]);
}
