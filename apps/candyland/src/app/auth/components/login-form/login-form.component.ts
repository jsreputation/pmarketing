import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@cl-core-services';

@Component({
  selector: 'cl-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public formLogin: FormGroup;
  public hide = true;
  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService
              ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public onSubmit(): void {
    if (this.formLogin.valid) {
      this.authService.signIn(this.formLogin.value)
      .subscribe((res: Response) => {
          if (res.status === 200) {
            this.router.navigate(['/dashboard']);
          }
        },
        error => {
          alert('The email or password is incorrect! ' + error);
        });
    }
  }

  get username(): AbstractControl | null { return this.formLogin.get('username'); }
  get password(): AbstractControl | null { return this.formLogin.get('password'); }
  get accountId(): AbstractControl | null { return this.formLogin.get('tenant_id'); }

  private createForm(): void {
    this.formLogin = this.fb.group({
      tenant_id: [null, [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.minLength(1),
        Validators.maxLength(50)
      ]],
      username: [null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ]],
      password: [null, [
        Validators.required
      ]]
    });
  }

}
