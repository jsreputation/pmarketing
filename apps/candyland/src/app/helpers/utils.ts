import _isEqual from 'lodash.isequal';
import _transform from 'lodash.transform';
import _isEmpty from 'lodash.isempty';

// tslint:disable

export default class Utils {

  static convertArrToObj(arr: any, propKey: string): { [key: string]: any } {
    return arr.reduce((map, obj) => {
      map[obj[propKey]] = obj;
      return map;
    }, {});
  }

  static convertObjToArr(obj: any): any[] {
    return Object.keys(obj).map((key) => {
      return {name: key, ...obj[key]};
    });
  }

  static filterUniq(arr: any[]): any[] {
    return arr.filter((item, pos, array) => array.indexOf(item) === pos);
  }

  static filterObj(obj: object, predicate): object {
    return Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .reduce((res, key) => (res[key] = obj[key], res), {});
  }

  static nestedObjectAssign(target, ...sources) {
    if (!sources.length) {
      return target;
    }
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, {[key]: {}});
          }

          this.nestedObjectAssign(target[key], source[key]);
        } else if (this.isArray(source[key])) {
          if (!target[key]) {
            Object.assign(target, {[key]: []});
          }

          target[key] = target[key].concat(source[key]);
        } else {
          Object.assign(target, {[key]: source[key]});
        }
      }
    }

    return this.nestedObjectAssign(target, ...sources);
  }

  static dcopy(target) {
    if (/number|string|boolean/.test(typeof target)) {
      return target;
    }
    if (target instanceof Date) {
      return new Date(target.getTime());
    }

    const copy = target instanceof Array ? [] : {};
    walk(target, copy);
    return copy;

    function walk(target, copy) {
      for (const key in target) {
        const obj = target[key];
        if (obj instanceof Date) {
          const value = new Date(obj.getTime());
          this.add(copy, key, value);
        } else if (obj instanceof Function) {
          const value = obj;
          this.add(copy, key, value);
        } else if (obj instanceof Array) {
          const value = [];
          const last = this.add(copy, key, value);
          walk(obj, last);
        } else if (obj instanceof Object) {
          const value = {};
          const last = this.add(copy, key, value);
          walk(obj, last);
        } else {
          const value = obj;
          this.add(copy, key, value);
        }
      }
    }
  }

  static add(copy, key, value) {
    if (copy instanceof Array) {
      copy.push(value);
      return copy[copy.length - 1];
    } else if (copy instanceof Object) {
      copy[key] = value;
      return copy[key];
    }
  }

  static isObject(item): boolean {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  static isArray(item): boolean {
    return item && Array.isArray(item);
  }

  static isEmptyObject(object): boolean {
    return this.isObject(object) && _isEmpty(object);
  }

  static getChanges(changedObject, base) {
    return _transform(changedObject, (result, value, key) => {
      if (!_isEqual(value, base[key])) {
        result[key] = value;
      }
    });
  }

  static getFormData(data): FormData {
    const formData: FormData = new FormData();
    Object.keys(data).forEach(key => {
      const value = data[key];
      formData.append(key, value);
    });
    return formData;
  }

  static getFiles<T>(model: T): Partial<T> {
    const partialModel: Partial<T> = {};
    Object.keys(model).forEach((key: string) => {
        if (model[key] && model[key].hasOwnProperty('image')) {
          partialModel[key] = model[key];
        }
      }
    );
    return partialModel;
  }
}
