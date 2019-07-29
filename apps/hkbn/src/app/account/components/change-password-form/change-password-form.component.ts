import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HkbnValidators } from '../../../helpers/hkbn-validators';

@Component({
  selector: 'hkbn-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent {

  @Output() public passwordChange: EventEmitter<any> = new EventEmitter<any>();

  public changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required])
  }, [HkbnValidators.equalityValidator('newPassword', 'confirmPassword')]);

  public submit(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.passwordChange.emit(this.changePasswordForm.value);
  }
}
