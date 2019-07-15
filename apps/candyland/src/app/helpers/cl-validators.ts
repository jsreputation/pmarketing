import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { sum } from './total-sum';


export class ClValidators extends Validators {
  constructor() {
    super();
  }
  static email(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control || !control.value) {
      return null;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //tslint:disable-line

    if (!re.test(control.value.toLowerCase())) {
      return {email: true};
    }
    return null;
  }

  static sumMoreThan(options: any): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} => {
      if (!control || !control.value) {
        return null;
      }
      const total = sum(control.value, options.fieldName);
      console.log('total', total);
      if (total > 100) {
        return {sumMoreThan: total};
      }
      return null;
    };
  }

  static sumLessThan(options: any): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} => {
      if (!control || !control.value) {
        return null;
      }
      const total = sum(control.value, options.fieldName);
      if (total < 100) {
        return {sumLessThan: true};
      }
      return null;
    };
  }
}
