import { patchUrl } from './patch-url.function';

describe('patchUrl', () => {
  it('should patch url properly', () => {
    [
      { input: 'https://cdn.perxtech.io/bla', output: 'https://cdn.perxtech.io/bla' },
      { input: 'http://cdn.perxtech.net/bla', output: 'https://cdn.perxtech.net/bla' },
      { input: 'https://cdn.perxtech.io/bla', output: 'https://cdn.perxtech.io/bla' },
      { input: 'https://cdn.perxtech.net/bla', output: 'https://cdn.perxtech.net/bla' }
    ].forEach((ca) => {
      expect(patchUrl(ca.input)).toEqual(ca.output);
    });
  });
});
