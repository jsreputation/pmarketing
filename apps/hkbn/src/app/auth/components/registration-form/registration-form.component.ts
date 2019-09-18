import { Component, EventEmitter, Output, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ISignUpData } from '@perx/core/dist/perx-core/lib/auth/authentication/models/authentication.model';
import { ICountryCode } from '@perx/core';

@Component({
  selector: 'hkbn-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationFormComponent implements OnInit {
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
    code: new FormControl(11, [HkbnValidators.required]),
    email: new FormControl(null, [HkbnValidators.required, HkbnValidators.email]),
    password: new FormControl(null, [HkbnValidators.required, Validators.minLength(6)]),
    password_confirmation: new FormControl(null, [HkbnValidators.required, Validators.minLength(6)]),
    terms: new FormControl(null, [HkbnValidators.requiredTrue]),
    promo: new FormControl(null)
  }, [HkbnValidators.equalityValidator('password', 'password_confirmation')]);

  constructor(
    private dataTransfer: DataTransferService
  ) {
  }

  public ngOnInit(): void {
    this.dataTransfer.updateData$.subscribe((data: ISignUpData) =>
      data && this.registrationForm.setValue({ ...data, code: 11, phone: data.phone.substr(3) }));
  }

  public submit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    const requestBody = this.registrationForm.value;
    requestBody.phone = this.countryCodes.find(code => code.id === requestBody.code).phone + requestBody.phone;
    delete requestBody.code;
    this.dataTransfer.newxUpdateData(requestBody);
    this.formSubmit.emit(requestBody);
  }
}
