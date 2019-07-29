import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HkbnValidators } from '../../../helpers/hkbn-validators';

@Component({
  selector: 'hkbn-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent {

  public changePasswordForm: FormGroup = new FormGroup({
    old_password: new FormControl(null, [Validators.required]),
    new_password: new FormControl(null, [Validators.required]),
    confirm_password: new FormControl(null, [Validators.required])
  }, [HkbnValidators.equalityValidator('new_password', 'confirm_password')]);
}
