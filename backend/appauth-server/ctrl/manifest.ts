import cacheManager from 'cache-manager';
// note to self: could just use it's dependency lru-cache instead. which can reset
import Jimp from 'jimp/es';
import { ApiConfig } from '../types/apiConfig';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

// WIP would be typed later;
let exportedImgDirectory = './generated';
// max set to 1 so only most recent value will be kept and will be replaced if new settings is different from old
const memoryCache = cacheManager.caching({ store: 'memory', max: 1, ttl: 0 });

const themeHasher = (themeObject: string): number => {
  for (var i = 0, h = 0xdeadbeef; i < themeObject.length; i++) {
    h = Math.imul(h ^ themeObject.charCodeAt(i), 2654435761);
  }
  return (h ^ h >>> 16) >>> 0;
}
// this file thing save where need ask nic
const generateManifest = (themeColor: string, bgColor: string) => {
  return (
    {
      "short_name": "Photo Feed", // prbly pass in tenantName
      "name": "Photo Feed",
      "icons": [
        // would generate according to jiff, jiff will put into static
        {
          "src": "./generated/img192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "./generated/img512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "./generated/img192x192.png",
          "sizes": "16x16",
          "type": "image/png"
        },
        {
          "src": "./generated/img32x32.png",
          "sizes": "32x32",
          "type": "image/png"
        },
        {
          "src": "./generated/img64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        }
      ],
      "start_url": "/",
      "display": "standalone",
      "theme_color": themeColor,
      "background_color": bgColor
    }
  );
}

export const manifest = (apiConfig: ApiConfig) => async (req: Request, res: Response, next: NextFunction) => {
  // will send it to this EXPRESS_DIST_Folder?
  // my manifest file can refer to that dir on server.ts? wh dir
  // is there a way of express to delete files after that? so i save space
  try {
    // check body parameter 'url'
    const url = req.body.url;

    if (url === undefined) {
      throw new Error('No body parameter "url" specified');
    }
    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found for ${url}`);
    }
    const endpointCredential = apiConfig.credentials[endpoint.account_id];
    const endpointRequest = await axios.get(
      `${endpoint.target_url}/iam/tenants`,
      {
        headers: {
          Authorization: endpointCredential.basic_token,
          'Content-Type': 'text/plain'
        }
      }
    );
    let tenantObj = endpointRequest.data;
    console.log(tenantObj);
    const displayProperties = tenantObj.attributes.display_properties;
    const themeColorAPI = displayProperties['theme.style'] === 'LIGHT' ? '#fafafa' : '#1f2935'; // from themes.model
    const themeBGAPI = displayProperties['theme.button_background_color'];
    Jimp.read(displayProperties['theme.logo'])
      .then(image => {
        // Do stuff with the image.
        const sizesArray = [16, 32, 64, 192, 512,]; // generate ownself for completeness
        for (let size of sizesArray) {
          image.clone().resize(size, size)
            .writeAsync(exportedImgDirectory + `/img${size}x${size}.png`)
        }
      })
      .catch(err => {
        // Handle an exception.
        console.log(err);
      });
    const hashedTheme = themeHasher(themeColorAPI + themeBGAPI).toString(36);
    // we could peek instd so its 'most-recentness' isn't updated
    memoryCache.get(hashedTheme, (_, result) => {
      // if err means hashedTheme dont match -> repatch 
      // can be dont match or dont exist // doesnt matter -> we regenerate
      if (result) {
        return res.json(result);
      } else {
        // throw away old hashedTheme else will find again the old one even from change in tenant settings & wont update when it should
        // try to fetch if no have or if the key change, then set, 0 for ttl everlast
        memoryCache.set(hashedTheme, generateManifest(themeColorAPI, themeBGAPI), 0);
      }
    })
    res.json(generateManifest(themeColorAPI, themeBGAPI))
  } catch (e) {
    if (e.response && e.response.data && e.response.status) {
      res.status(e.response.status).json(e.response.data);
    } else {
      next(e);
    }
  }
}