import { getEndPoints } from './getEndPoints';
import { getTenantsList } from './tenantsList';
import cacheManager from 'cache-manager';
import { ICredentials } from '../types/apiConfig';
import { getRootCredentials } from '../utils/credentialsWhistler';
import { createToken } from './createToken';
import { IJsonApiItem, IWCognitoEndpointAttributes } from '@perx/whistler';

const cache = cacheManager.caching({ store: 'memory', max: 100, ttl: 0 });

interface tokenTableRowData {
  token: string;
}

interface urlTableRowData {
  accountId: string;
}

function resolveTenant(accountId: string, rootToken: ICredentials): Promise<void> {
  const tenantCredential: ICredentials = {
    target_url: rootToken.target_url,
    basic_token: '',
    perx_access_key_id: '',
    perx_secret_access_key: ''
  };
  console.log('resolveTenant ', accountId);
  //check cache for token
  return new Promise((resolve) => {
    cache.get(accountId, async (_: Error, result: tokenTableRowData) => {
      console.log('resolveTenant inside ', accountId);
      if (!result || !result.token) {
        //otherwise fetch it and put in cache
        const createTokenData = await createToken(rootToken, accountId);
        const token = createTokenData.headers.authorization
        console.log('token ', accountId + token);
        tenantCredential.basic_token = token;
        cache.set(accountId, {
          token
        }, 0);
      } else {
        tenantCredential.basic_token = result.token;
      }
      const tenantEndPointRawData = await getEndPoints(tenantCredential);
      const tenantURLs = tenantEndPointRawData.data.data;
      console.log('tenantUrls ', tenantURLs);
      tenantURLs.forEach((tenantURLData: IJsonApiItem<IWCognitoEndpointAttributes>) => {
        const tenantUrl = tenantURLData.attributes.url;
        cache.get(tenantUrl, (_: Error, result: urlTableRowData) => {
          if (!result) {
            cache.set(tenantUrl, {
              accountId
            }, 0);
          }
        });
      });
      resolve();
    });
  });
}

async function updateMapping(rootToken: ICredentials): Promise<void> {
  const tenantsList = await getTenantsList(rootToken);
  console.log('tenantsList ', tenantsList);
  const tenantsTokenQuerries = tenantsList.map(tenant => resolveTenant(tenant.accountId, rootToken));
  // console.log('tenantsTokenQuerries ', tenantsTokenQuerries);
  await Promise.all(tenantsTokenQuerries);

  return Promise.resolve();
}

export const getCredential = (url: string): Promise<ICredentials> => {
  console.log('getting credentials');
  if (url.includes('localhost')) {
    url = 'https://generic-blackcomb-dev1.uat.whistler.perxtech.io/';
  } else {
    url += '/';
  }

  let credential: ICredentials = {
    target_url: '',
    basic_token: '',
    perx_access_key_id: '',
    perx_secret_access_key: ''
  };
  const cbFn = (result: tokenTableRowData, targetUrl: string): ICredentials => {
    credential.basic_token = result.token;
    credential.target_url = targetUrl;
    console.log('••••••••••••••••••••••••');
    console.log('request url: ', url);
    console.log('request token: ', credential);
    console.log('••••••••••••••••••••••••');
    return credential
  }

  console.log('getting from cache', url);
  return new Promise((resolve, reject) => {
    cache.get(url, async (_: Error, result: urlTableRowData) => {
      const rootToken: ICredentials = await getRootCredentials();

      if (!result || !result.accountId) {
        console.log('no value');
        try {
          await updateMapping(rootToken);
        } catch (err) { reject(err) }
        cache.get(url, (_: Error, newResult: urlTableRowData) => {
          console.log('=======================');
          console.log('newResult:', newResult);
          console.log('=======================');
          if (newResult && newResult.accountId) {
            cache.get(newResult.accountId, (_: Error, newTokenResult: tokenTableRowData) => {
              resolve(cbFn(newTokenResult, rootToken.target_url));
            });
          }
        });
      } else {
        console.log('has value');
        cache.get(result.accountId, async (_: Error, tokenResult: tokenTableRowData) => {
          resolve(cbFn(tokenResult, rootToken.target_url));
        });
      }
    });
  });
};

getCredential('http://localhost/')
  .then(res => console.log(res))
  .catch(err => console.log(err))
  .finally(() => {
    console.log('finally');
    process.exit()
  });
