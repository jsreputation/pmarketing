import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HkbnValidators } from '../../../helpers/hkbn-validators';

@Component({
  selector: 'hkbn-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationFormComponent {

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
    this.formSubmit.emit(this.registrationForm.value);
  }

}
