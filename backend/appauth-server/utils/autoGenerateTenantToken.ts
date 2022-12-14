import { getEndPoints } from '../ctrl/getEndPoints';
import { getTenantsList } from '../ctrl/tenantsList';
import cacheManager from 'cache-manager';
import { ICredentials } from '../types/apiConfig';
import { getRootCredentials } from './credentialsWhistler';
import { createToken } from '../ctrl/createToken';
import { IJsonApiItem, IWCognitoEndpointAttributes } from '@perxtech/whistler';

const cache = cacheManager.caching({ store: 'memory', max: 100, ttl: 0 });

interface ITokenTableRowData {
  token: string;
}

interface IURLTableRowData {
  accountId: string;
}

function resolveTenant(accountId: string, rootToken: ICredentials): Promise<void> {
  const tenantCredential: ICredentials = {
    target_url: rootToken.target_url,
    basic_token: '',
    perx_access_key_id: '',
    perx_secret_access_key: ''
  };
  // check cache for token
  return new Promise((resolve) => {
    // @ts-ignore
    cache.get(accountId, async (tokenErr: Error, result: ITokenTableRowData) => {
      if (!result || !result.token) {
        // otherwise fetch it and put in cache
        const createTokenData = await createToken(rootToken, accountId);
        const token = createTokenData.headers.authorization;
        tenantCredential.basic_token = token;
        cache.set(accountId, {
          token
        }, 0);
      } else {
        tenantCredential.basic_token = result.token;
      }
      if (tenantCredential.basic_token) {
        const tenantEndPointRawData = await getEndPoints(tenantCredential);
        const tenantURLs = tenantEndPointRawData.data.data;
        if (Array.isArray(tenantURLs) && tenantURLs.length > 0) {
          tenantURLs.forEach((tenantURLData: IJsonApiItem<IWCognitoEndpointAttributes>) => {
            const tenantUrl = getTargetEndPoint(tenantURLData.attributes.url);
            // @ts-ignore
            cache.get(tenantUrl, (urlErr: Error, resultURL: IURLTableRowData) => {
              if (!resultURL) {
                cache.set(tenantUrl, {
                  accountId
                }, 0);
              }
            });
          });
        }
      }
      resolve();
    });
  });
}

async function updateMapping(rootToken: ICredentials): Promise<void> {
  const tenantsList = await getTenantsList(rootToken);
  const tenantsTokenQuerries = tenantsList.map(tenant => resolveTenant(tenant.accountId, rootToken));
  await Promise.all(tenantsTokenQuerries);

  return Promise.resolve();
}

const getTargetEndPoint = (url: string) => {
  if (url.startsWith('https://')) {
    url = url.split('https://')[1].split('/')[0];
  }
  if (url.startsWith('http://')) {
    url = url.split('http://')[1].split('/')[0];
  }

  return url;
};

const getTargetUrl = (url: string) => {
  if (url.includes('localhost')) {
    url = 'generic-blackcomb-dev1.uat.whistler.perxtech.io';
  }

  return url;
};

export const getCredential = (url: string): Promise<ICredentials> => {
  url = getTargetUrl(url);

  const credential: ICredentials = {
    target_url: '',
    basic_token: '',
    perx_access_key_id: '',
    perx_secret_access_key: ''
  };
  const cbFn = (result: ITokenTableRowData, targetUrl: string): ICredentials => {
    credential.basic_token = result.token;
    credential.target_url = targetUrl;
    return credential;
  };

  return new Promise((resolve, reject) => {
    // @ts-ignore
    cache.get(url, async (urlErr: Error, result: IURLTableRowData) => {
      const rootToken: ICredentials = await getRootCredentials();
      try {
        if (!result || !result.accountId) {
          await updateMapping(rootToken);
          // @ts-ignore
          cache.get(url, (urlErrNest: Error, newResult: IURLTableRowData) => {
            if (newResult && newResult.accountId) {
              cache.get(newResult.accountId, (__: Error, newTokenResult: ITokenTableRowData) => {
                resolve(cbFn(newTokenResult, rootToken.target_url));
              });
            }
          });
        } else {
          // @ts-ignore
          cache.get(result.accountId, (urlErrNest: Error, tokenResult: ITokenTableRowData) => {
            resolve(cbFn(tokenResult, rootToken.target_url));
          });
        }
      } catch (err) { reject(err); }

    });
  });
};
