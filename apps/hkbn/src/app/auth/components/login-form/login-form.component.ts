import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface LoginFormValue {
  user: string;
  pass: string;
  stayLoggedIn: boolean;
}

@Component({
  selector: 'hkbn-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Output()
  public loginSubmit: EventEmitter<LoginFormValue> = new EventEmitter<LoginFormValue>();

  @Output()
  public forgotPassword: EventEmitter<string> = new EventEmitter<string>();

  public loginForm: FormGroup = new FormGroup({
    user: new FormControl(null, [Validators.required]),
    pass: new FormControl(null, [Validators.required]),
    stayLoggedIn: new FormControl(null)
  });

  public submit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginSubmit.emit(this.loginForm.value);
  }

  public forgot(): void {
    this.forgotPassword.emit(this.loginForm.value.user || '');
  }

}
