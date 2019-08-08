import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AppService {
  public getToken(id: number): string {
    // you will need to install via 'npm install jsonwebtoken' or in your package.json
    // const METABASE_SITE_URL = "https://metabase.perxtech.io";
    const METABASE_SECRET_KEY = '516b794bfd85e5aebfe3de3e7708ea7bcc1064f3a953a06fd444065ed263cd77';

    const payload = {
      resource: { question: id },
      params: { tenant: 'digi_digi' },
      exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    return sign(payload, METABASE_SECRET_KEY);
  }
}
