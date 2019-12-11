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

const generateRowData = async () => {
  const rootToken: ICredentials = await getRootCredentials();
  const tenantsList = await getTenantsList(rootToken);
  for (let index = 0; index < tenantsList.length; index++) {
    const tenant = tenantsList[index];
    const createTokenData = await createToken(rootToken, tenant.accountId);
    const tenantToken = createTokenData.headers.authorization;
    const newCredentials = {
      target_url: rootToken.target_url,
      basic_token: tenantToken
    } as ICredentials;
    const tenantEndPointRawData = await getEndPoints(newCredentials);
    const tenantURLs = tenantEndPointRawData.data.data;
    for (let indexURL = 0; indexURL < tenantURLs.length; indexURL++) {
      const tenantUrl = tenantURLs[indexURL].attributes.url;
      console.log('tenantUrl', tenantUrl);
      cache.get(tenantUrl, (_: Error, result: tokenTableRowData) => {
        if (!result) {
          cache.set(tenantUrl, {
            accountId: tenant.accountId,
            token: tenantToken,
            tenantId: tenant.id
          }, 0);
        }
      });
    }
  };
}

export function getCredential(url: string): Promise<ICredentials> {
  if (url.includes('localhost')) {
    url = 'https://generic-blackcomb-dev1.uat.whistler.perxtech.io/';
  } else {
    url += '/';
  }
  let credential: ICredentials = {
    target_url: url,
    basic_token: '',
    perx_access_key_id: '',
    perx_secret_access_key: ''
  };
  console.log('request URL: ', url);
  cache.get(url, async (_: Error, result: tokenTableRowData) => {
    if (!result) {
      generateRowData();
      cache.get(url, async (_: Error, newResult: tokenTableRowData) => {
        console.log('=======================');
        console.log('newResult:', newResult);
        console.log('=======================');
        if (newResult) {
          credential.basic_token = newResult.token;
        }
      });
    } else {
      console.log('=======================');
      console.log('result:', result);
      console.log('=======================');
      credential.basic_token = result.token;
    }
  });
  return Promise.resolve(credential);
};
