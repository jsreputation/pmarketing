import { getEndPoints } from './getEndPoints';
import { getTenantsList } from './tenantsList';
import cacheManager from 'cache-manager';
import { ICredentials } from '../types/apiConfig';
import { getRootCredentials } from '../utils/credentialsWhistler';
import { createToken } from './createToken';
import { IJsonApiItem, IWCognitoEndpointAttributes } from '@perx/whistler';
import { Request, Response, NextFunction } from 'express';
import { getQueryHost } from '../utils/utils';

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
        console.log('createTokenData: ', createTokenData.headers.authorization);
        console.log('=====================================');
        const token = createTokenData.headers.authorization;
        tenantCredential.basic_token = token;
        cache.set(accountId, {
          token
        }, 0);
      } else {
        tenantCredential.basic_token = result.token;
      }
      const tenantEndPointRawData = await getEndPoints(tenantCredential);
      console.log('tenantEndPointRawData: ', tenantEndPointRawData.data.data);
      console.log('=====================================');
      const tenantURLs = tenantEndPointRawData.data.data;
      tenantURLs.forEach((tenantURLData: IJsonApiItem<IWCognitoEndpointAttributes>) => {
        const tenantUrl = tenantURLData.attributes.url;
        // @ts-ignore
        cache.get(tenantUrl, (urlErr: Error, resultURL: IURLTableRowData) => {
          if (!resultURL) {
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
  console.log('tenantsList: ', tenantsList);
  console.log('=====================================');
  const tenantsTokenQuerries = tenantsList.map(tenant => resolveTenant(tenant.accountId, rootToken));
  await Promise.all(tenantsTokenQuerries);

  return Promise.resolve();
}

export const removeCredentialCache = () => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check body parameter 'url'
    let url: string = getQueryHost(req);
    url = getTargetUrl(url);
    const accountId: string = req.body.accountId;
    // @ts-ignore
    cache.get(accountId, (tokenErr: Error, result: ITokenTableRowData) => {
      cache.del(accountId);
    });
    // @ts-ignore
    cache.get(url, (urlErr: Error, urlResult: IURLTableRowData) => {
      cache.del(accountId);
    });
    res.json(accountId + ' deleted successfully!');
  } catch (e) {
    next(e);
  }
};

const getTargetUrl = (url: string) => {
  if (url.includes('localhost')) {
    url = 'https://generic-blackcomb-dev1.uat.whistler.perxtech.io/';
  } else {
    url += '/';
  }
  return url;
}
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

      if (!result || !result.accountId) {
        try {
          await updateMapping(rootToken);
        } catch (err) { reject(err); }
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
    });
  });
};
