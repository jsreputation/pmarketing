import { getEndPoints } from './getEndPoints';
import { getTenantsList } from './tenantsList';
import cacheManager from 'cache-manager';
import { ICredentials } from '../types/apiConfig';
import { getRootCredentials } from '../utils/credentialsWhistler';
import { createToken } from './createToken';

const cache = cacheManager.caching({ store: 'memory', max: 100, ttl: 0 });

interface tokenTableRowData {
  accountId: string;
  token: string;
  tenantId: string;
}

const generateRowData = async (url: string) => {
  const rootToken: ICredentials = await getRootCredentials();
  const tenantsList = await getTenantsList(rootToken);
  for (let index = 0; index < tenantsList.length; index++) {
    const tenant = tenantsList[index];
    const createTokenData = await createToken(rootToken, tenant.accountId);
    const tenantToken = createTokenData.headers.authorization;
    const tenantEndPointRawData = await getEndPoints(tenantToken);
    const tenantUrl = tenantEndPointRawData.data.data.attributes.url;

    cache.get(tenantUrl, (_: Error, result: tokenTableRowData) => {
      if (!result) {
        cache.set(url, {
          accountId: tenant.accountId,
          token: tenantToken,
          tenantId: tenant.id
        }, 0);
      }
    });
  };
}

export function getCredential(url: string): Promise<ICredentials> {
  let credential: ICredentials = {
    target_url: url,
    basic_token: '',
    perx_access_key_id: '',
    perx_secret_access_key: ''
  };

  cache.get(url, async (_: Error, result: tokenTableRowData) => {
    if (!result) {
      generateRowData(url);
      cache.get(url, async (_: Error, newResult: tokenTableRowData) => {
        if (newResult) {
          credential.basic_token = newResult.token;
        }
      });
    }
    credential.basic_token = result.token;
  });
  return Promise.resolve(credential);
};
