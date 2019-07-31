import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export class HkbnValidators extends Validators {

  constructor() {
    super();
  }

  public static email(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control || !control.value) {
      return null;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //tslint:disable-line

    if (!re.test(control.value.toLowerCase())) {
      return {email: true};
    }
    return null;
  }

  public static equalityValidator(firstField: string, secondField: string): ValidatorFn {
    return (control: AbstractControl) => {
      const firstValue = control.get(firstField).value;
      const secondValue = control.get(secondField).value;

      if (firstValue !== secondValue) {
        control.get(secondField).setErrors({notEqual: true});
        return {notEqual: true};
      }
      return null;
    };
  }
}
