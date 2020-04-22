import { patchUrl } from './patch-url.function';

describe('patchUrl', () => {
  it('should patch url properly', () => {
    [
      { input: 'http://perx-cdn-staging.s3.amazonaws.com/bla', output: 'https://cdn.perxtech.io/bla' },
      { input: 'http://perx-cdn.s3.amazonaws.com/bla', output: 'https://cdn.perxtech.net/bla' },
      { input: 'https://perx-cdn-staging.s3.amazonaws.com/bla', output: 'https://cdn.perxtech.io/bla' },
      { input: 'https://perx-cdn.s3.amazonaws.com/bla', output: 'https://cdn.perxtech.net/bla' }
    ].forEach((ca) => {
      expect(patchUrl(ca.input)).toEqual(ca.output);
    });
  });
});
