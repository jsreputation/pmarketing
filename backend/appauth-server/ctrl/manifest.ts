import cacheManager from 'cache-manager';
import Jimp from 'jimp';
import { IJsonApiItem, IWTenant } from '@perx/whistler';
import { Manifest, DARK, LIGHT } from '../types/manifest-model';
import { ICredentials } from '../types/apiConfig';
import { Request, Response, NextFunction } from 'express';
import { fetchTheme } from '../utils/theme';
import { getQueryHost } from '../utils/utils';
import { readFileSync } from 'fs';

const exportedImgDirectory = '/static/generated';
// max set to 1 so only most recent value will be kept, old will be replaced if new settings
// refer to https://www.npmjs.com/package/cache-manager under Usage Examples
const cache = cacheManager.caching({ store: 'memory', max: 1, ttl: 0 });

const themeHasher = (themeObject: string): number => {
  let h = 0xdeadbeef;
  for (let i = 0; i < themeObject.length; i++) {
    // tslint:disable-next-line:no-bitwise
    h = Math.imul(h ^ themeObject.charCodeAt(i), 2654435761); // eslint-disable-line
  }
  // tslint:disable-next-line:no-bitwise
  return (h ^ (h >>> 16)) >>> 0; // eslint-disable-line
};

const generateManifest = (
  tenantObj: IJsonApiItem<IWTenant>,
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
      .then((image) => {
        // Do stuff with the image.
        image
          .clone()
          .contain(size, size)
          .write(`${endpointUrl}/${exportedImgDirectory}/${hash}/${size}x${size}.png`); // use a name, which includes the hash
      })
      .catch((err: Error) => {
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

function getLocalManifest(appPath: string, res: Response, req: Request): void {
  const manif: Manifest = JSON.parse(readFileSync(`${appPath}${req.path}`).toString());
  if (manif) {
    res.send(manif);
  } else {
    res.status(404).send('Not Found');
  }
}

export const manifest = (getCredentials: ((url: string) => Promise<ICredentials>), appPath: string) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // is there a way of express to delete files after that? so i save space, rly generate on fly
  try {
    const url: string = getQueryHost(req);
    const endpointCredential: ICredentials = await getCredentials(url);

    const endpointTargetUrl = endpointCredential.target_url;
    const endpointRequest = await fetchTheme(endpointCredential);

    const tenantObj: IJsonApiItem<IWTenant> = endpointRequest.data.data[0];
    const displayProperties = tenantObj.attributes.display_properties;
    const hashedTheme = themeHasher(JSON.stringify(displayProperties)).toString(12);
    // we could peek instd so its 'most-recentness' isn't updated
    res.type('application/manifest+json');

    cache.get(hashedTheme, (_: Error, result: Manifest) => {
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
      res.status(400).json(e.response.data);
    } else {
      try {
        getLocalManifest(appPath, res, req);
      } catch (e) {
        next(e);
      }
    }
  }
};
