import { NoRenewaleInNamePipe } from './no-renewale-in-name.pipe';

describe('Pipe: Default', () => {
  let pipe: NoRenewaleInNamePipe;

  beforeEach(() => {
    pipe = new NoRenewaleInNamePipe();
  });

  it('should return null on pipe transfor', () => {
    const name = pipe.transform(null);
    expect(name).toBe('');
  });

  it('should remove (renewal on pipe transform)', () => {
    const name = pipe.transform('gold (renewal)');
    expect(name).toBe('gold');
  });
});
