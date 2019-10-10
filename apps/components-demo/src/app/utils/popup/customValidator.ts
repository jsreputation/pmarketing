import { AbstractControl } from '@angular/forms';
export class CustomValidators {
  public static urlValidator(url: AbstractControl): {[Key: string]: boolean } | null {
    if (url.pristine) {
      return null;
    }
    const URL_REGEXP = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

    url.markAsTouched();

    if (URL_REGEXP.test(url.value)) {
      return null;
    }

    return {
      invalidUrl: true
    };

  }
}
