import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { IChangePasswordData } from '@perxtech/core';

@Component({
  selector: 'hkbn-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent {

  @Output() public passwordChange: EventEmitter<IChangePasswordData> = new EventEmitter<IChangePasswordData>();

  public changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl(null, [Validators.required, Validators.minLength(6)])
  }, [HkbnValidators.equalityValidator('newPassword', 'passwordConfirmation')]);

  @Input() public set cache(passwordChangeForm: IChangePasswordData) {
    if (this.changePasswordForm && passwordChangeForm) {
      this.changePasswordForm.setValue(passwordChangeForm);
    }
  }

  public submit(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.passwordChange.emit(this.changePasswordForm.value);
  }
}
