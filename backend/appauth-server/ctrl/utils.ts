import { Request } from 'express';

export function getQueryHost(req: Request): string {
  if (req.query.url) {
    return req.query.url;
  }

  if (req.headers.origin) {
    if (typeof req.headers.origin === 'string') {
      const segments = req.headers.origin.split('/').filter(s => s !== '');
      return segments[1];
    }

    if (Array.isArray(req.headers.origin)) {
      const segments = req.headers.origin[0].split('/')
        .filter(s => s !== '');
      return segments[1];
    }
  }
  // for production
  if (req.headers.host) {
    return req.headers.host;
  }

  throw new Error('request origin host is not available');
}
