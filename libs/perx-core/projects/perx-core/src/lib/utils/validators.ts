import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function equalityValidator(firstFieldPath: string, secondFieldPath: string): ValidatorFn {
  // eslint-disable-next-line
  const validator = function (control: AbstractControl): ValidationErrors | null {
    const firstField = control.get(firstFieldPath);
    const secondField = control.get(secondFieldPath);
    if (firstField === null || secondField === null) {
      return null;
    }
    const firstValue = firstField.value;
    const secondValue = secondField.value;

    if (firstValue !== secondValue) {
      secondField.setErrors({ notEqual: true });
      return { notEqual: true };
    }
    return null;
  };
  // eslint-disable-next-line
  return validator;
}

export function emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (!control || !control.value) {
    return null;
  }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //tslint:disable-line

  if (!re.test(control.value.toLowerCase())) {
    return {email: true};
  }
  return null;
}
