import cacheManager from 'cache-manager';
import Jimp from 'jimp';
import {
  IJsonApiItem
} from '@perx/whistler';
import { ITenantAttributes } from '@perx/core';
import { Manifest, DARK, LIGHT } from '../types/manifest-model';
import { ApiConfig } from '../types/apiConfig';
import { Request, Response, NextFunction } from 'express';
import { fetchTheme } from './themes';
import { getQueryHost } from './utils';

const exportedImgDirectory = '/static/generated';
// max set to 1 so only most recent value will be kept, old will be replaced if new settings
// refer to https://www.npmjs.com/package/cache-manager under Usage Examples
const cache = cacheManager.caching({ store: 'memory', max: 1, ttl: 0 });

const themeHasher = (themeObject: string): number => {
  for (let i = 0, h = 0xdeadbeef; i < themeObject.length; i++) {
    // tslint:disable-next-line:no-bitwise
    h = Math.imul(h ^ themeObject.charCodeAt(i), 2654435761); // eslint-disable-line
  }
  // tslint:disable-next-line:no-bitwise
  return (h ^ (h >>> 16)) >>> 0; // eslint-disable-line
};

const generateManifest = (
  tenantObj: IJsonApiItem<ITenantAttributes>,
  endpointUrl: string,
  hash: string
): Manifest => {
  const displayProperties = tenantObj.attributes.display_properties;
  const themeColorAPI =
    displayProperties['theme.style'] === LIGHT.name
      ? LIGHT.properties['--background']
      : DARK.properties['--background'];
  const themeBGAPI = displayProperties['theme.button_background_color'];
  const themeName = tenantObj.attributes.name;
  const imageSizes = [16, 32, 64, 192, 512];
  imageSizes.forEach(size =>
    Jimp.read(displayProperties['theme.logo'])
      .then(image => {
        // Do stuff with the image.
        image
          .clone()
          .contain(size, size)
          .write(`${endpointUrl}/${exportedImgDirectory}/${hash}/${size}x${size}.png`); // use a name, which includes the hash
      })
      .catch(err => {
        console.log(err);
      })
  );
  return {
    short_name: themeName,
    name: themeName,
    icons: imageSizes.map(size => ({
      src: `/${exportedImgDirectory}/${hash}/${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png'
    })),
    start_url: '/',
    display: 'standalone',
    theme_color: themeColorAPI,
    background_color: themeBGAPI
  };
};

export const manifest = (apiConfig: ApiConfig) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // is there a way of express to delete files after that? so i save space, rly generate on fly
  try {
    const url = getQueryHost(req);

    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found for ${url}`);
    }

    const endpointTargetUrl = endpoint.target_url;
    const endpointRequest = await fetchTheme(url, apiConfig);
    const tenantObj: IJsonApiItem<ITenantAttributes> = endpointRequest.data.data[0];
    const displayProperties = tenantObj.attributes.display_properties;
    const hashedTheme = themeHasher(JSON.stringify(displayProperties)).toString(
      12
    );
    // we could peek instd so its 'most-recentness' isn't updated
    res.type('application/manifest+json');

    cache.get(hashedTheme, (_, result) => {
      // can be dont match or dont exist // doesnt matter -> we regenerate
      if (!result) {
        // try to fetch if no have or if the key change, then set, 0 for ttl everlast
        result = generateManifest(tenantObj, endpointTargetUrl, hashedTheme);
        cache.set(hashedTheme, result, 0);
      }
      res.json(result);
    });
  } catch (e) {
    if (e.response && e.response.data && e.response.status) {
      res.status(e.response.status).json(e.response.data);
    } else {
      next(e);
    }
  }
};
