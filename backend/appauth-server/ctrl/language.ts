// import { ApiConfig } from '../types/apiConfig';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { join } from 'path';

const EXPRESS_DIST_FOLDER = join(process.cwd());

export const language = () => (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const app = req.query.app ? `${req.query.app}-` : '';
    const langsStr: string | undefined = req.headers['accept-language'];
    let langs = ['en'];
    if (langsStr) {
      langs = langsStr.split(',');
    }
    if (req.query.default) {
      langs.push(<string>req.query.default);
    }
    langs.push('en');
    langs = langs.map(l => l.split(';')[0])
      .map(l => l.split('-')[0]);
    const lang: string = langs.find(l => fs.existsSync(join(EXPRESS_DIST_FOLDER, `/assets/${app}${l}.json`))) || '';
    res.setHeader('content-language', lang);
    res.sendFile(join(EXPRESS_DIST_FOLDER, `/assets/${app}${lang}.json`));
  } catch (e) {
    next(e);
  }
};
