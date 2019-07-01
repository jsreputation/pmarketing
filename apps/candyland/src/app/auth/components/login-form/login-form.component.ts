import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cl-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public formLogin: FormGroup;
  public hide = true;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm()
  }

  public onSubmit(): void {
    if (this.formLogin.valid) {
      console.log(this.formLogin);
    }
  }

  get email() { return this.formLogin.get('email'); }
  get password() { return this.formLogin.get('password'); }

  private createForm(): void {
    this.formLogin = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(50)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(50)
      ]]
    });
  }

}
