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
    pass: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    stayLoggedIn: new FormControl(null)
  });

  public submit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    if (!this.isEmail(this.loginForm.value.user)) {
      this.loginForm.value.user = this.loginForm.value.user.replace(/[^0-9]/g, '');
    }

    this.loginSubmit.emit(this.loginForm.value);
  }

  public forgot(): void {
    this.forgotPassword.emit(this.loginForm.value.user || '');
  }

  private isEmail(email: string): boolean {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email));
  }

}
