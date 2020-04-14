export function patchUrl(url: string): string {
  const mappings = [
    { s3: 'perx-cdn-staging.s3.amazonaws.com', cdn: 'cdn.getperx.io' },
    { s3: 'perx-cdn.s3.amazonaws.com', cdn: 'cdn.perxtech.net' }
  ];
  mappings.forEach(mapping => url = url.replace(mapping.s3, mapping.cdn));
  return url;
}
