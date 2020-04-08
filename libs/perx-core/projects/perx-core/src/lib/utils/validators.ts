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
