// import _isEqual from 'lodash.isequal';
import * as _isEqual from 'lodash.isequal';

// import _transform from 'lodash.transform';
// import _isEmpty from 'lodash.isempty';

// tslint:disable
export default class Utils {
  public static isEqual(value: any, other: any): boolean {
    return _isEqual(value, other);
  }
}
