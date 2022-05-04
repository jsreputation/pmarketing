// import { ApiConfig } from '../types/apiConfig';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { join } from 'path';

const EXPRESS_DIST_FOLDER = join(__dirname);

export const language = () => (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const app = req.query.app ? `${(req.query.app as string).toLowerCase()}-` : '';
    const langsStr: string | undefined = req.headers['accept-language'];
    let langs = ['en'];
    if (langsStr) {
      langs = langsStr.split(',');
    }
   
    langs = langs.map(l => l.split(';')[0])
      .map(l => l.split('-')[0]);

    if (req.query.default) {
      langs.unshift(<string> req.query.default);
    }
    // find finds the first instance so default has to be at front of array to be fetched
    const lang: string = langs.find(l => fs.existsSync(join(EXPRESS_DIST_FOLDER, `/assets/${app}${l}.json`))) || '';
    res.setHeader('content-language', lang);
    res.sendFile(join(EXPRESS_DIST_FOLDER, `/assets/${app}${lang}.json`));
  } catch (e) {
    next(e);
  }
};
