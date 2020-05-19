export function patchUrl(url: string): string {
  const mappings = [
    { s3: 'http://perx-cdn-staging.s3.amazonaws.com', cdn: 'https://cdn.perxtech.io' },
    { s3: 'http://perx-cdn.s3.amazonaws.com', cdn: 'https://cdn.perxtech.net' },
    { s3: 'perx-cdn-staging.s3.amazonaws.com', cdn: 'cdn.perxtech.io' },
    { s3: 'perx-cdn.s3.amazonaws.com', cdn: 'cdn.perxtech.net' }
  ];
  mappings.forEach(mapping => url = url.replace(mapping.s3, mapping.cdn));
  return url;
}
