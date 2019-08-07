import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { sum } from './total-sum';

export class ClValidators extends Validators {
  // tslint:disable-next-line
  public static url: RegExp = /^((?:http|ftp)s?:\/\/)(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i;
  constructor() {
    super();
  }
  public static email(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control || !control.value) {
      return null;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //tslint:disable-line

    if (!re.test(control.value.toLowerCase())) {
      return { email: true };
    }
    return null;
  }

  public static sumMoreThan(options: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control || !control.value) {
        return null;
      }
      const total = sum(control.value, options.fieldName);
      if (total > 100) {
        return { sumMoreThan: true };
      }
      return null;
    };
  }

  public static sumLessThan(options: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control || !control.value) {
        return null;
      }
      const total = sum(control.value, options.fieldName);
      if (total < 100) {
        return { sumLessThan: true };
      }
      return null;
    };
  }

  public static checkUrl(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== null && control.value.length > 0) {
      return !ClValidators.url.test(control.value) ? { patternUrl: true } : null;
    }
  }

}
