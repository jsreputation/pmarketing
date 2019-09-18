import { Component, EventEmitter, Output, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { ICountryCode } from '@perx/core';

@Component({
  selector: 'hkbn-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationFormComponent {
  @Input() public countryCodes: ICountryCode[];
  @Output()
  public formSubmit: EventEmitter<any> = new EventEmitter<any>();

  public registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [HkbnValidators.required]),
    lastName: new FormControl(null, [HkbnValidators.required]),
    phone: new FormControl(null, [
      HkbnValidators.required,
      HkbnValidators.pattern('^[0-9]+$'),
      HkbnValidators.minLength(6),
      HkbnValidators.maxLength(11)
    ]),
    code: new FormControl('+852', [HkbnValidators.required]),
    email: new FormControl(null, [HkbnValidators.required, HkbnValidators.email]),
    password: new FormControl(null, [HkbnValidators.required, Validators.minLength(6)]),
    password_confirmation: new FormControl(null, [HkbnValidators.required, Validators.minLength(6)]),
    terms: new FormControl(null, [HkbnValidators.requiredTrue]),
    promo: new FormControl(null)
  }, [HkbnValidators.equalityValidator('password', 'password_confirmation')]);

  public submit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    const requestBody = this.registrationForm.value;
    requestBody.phone = requestBody.code.replace('+', '') + requestBody.phone;
    delete requestBody.code;
    this.formSubmit.emit(requestBody);
  }

}
