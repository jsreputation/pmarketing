// import { ApiConfig } from '../types/apiConfig';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { join } from 'path';

const EXPRESS_DIST_FOLDER = join(process.cwd());

export const language = () => (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const langsStr: string = req.headers['accept-language'];
    let langs = langsStr.split(',');
    if (req.query.default) {
      langs.push(req.query.default);
    }
    langs.push('en');
    langs = langs.map(l => l.split(';')[0]);
    const lang = langs.find(l => fs.existsSync(join(EXPRESS_DIST_FOLDER, `/assets/${l}-json.json`)));
    res.sendFile(join(EXPRESS_DIST_FOLDER, `/assets/${lang}-json.json`));
  } catch (e) {
    next(e);
  }
};
