import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { IChangePasswordData } from '@perx/core/dist/perx-core/lib/auth/authentication/models/authentication.model';

const mockOtp = '8888';

@Component({
  selector: 'hkbn-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent {

  @Output() public passwordChange: EventEmitter<IChangePasswordData> = new EventEmitter<IChangePasswordData>();

  public changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required]),
    otp: new FormControl(mockOtp),
    newPassword: new FormControl(null, [Validators.required]),
    passwordConfirmation: new FormControl(null, [Validators.required])
  }, [HkbnValidators.equalityValidator('newPassword', 'passwordConfirmation')]);

  public submit(): void {

    if (this.changePasswordForm.invalid) {
      return;
    }
    this.passwordChange.emit(this.changePasswordForm.value);
  }
}
