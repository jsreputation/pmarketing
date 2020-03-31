import _isEqual from 'lodash.isequal';

// eslint-disable-next-line @typescript-eslint/tslint/config
export default class Utils {
  public static isEqual(value: any, other: any): boolean {
    return _isEqual(value, other);
  }
}
