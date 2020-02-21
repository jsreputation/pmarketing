import _isEqual from 'lodash.isequal';

export default class Utils {
  public static isEqual(value: any, other: any): boolean {
    return _isEqual(value, other);
  }
}
