import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@es-core';

@Component({
  selector: 'es-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public formLogin: FormGroup;
  public hide: boolean = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public onSubmit(): void {
    if (this.formLogin.valid) {
      this.authService.signIn(this.formLogin.value)
        .subscribe(
          () => this.router.navigate(['/']),
          (error: Error) => alert('The email or password is incorrect! ' + error.message));
    }
  }

  public onForget(): void {
    const data = this.formLogin.value;
    this.router.navigate(['/password/forget'], {state: {id: data.account_id, user: data.username}});
  }

  get username(): AbstractControl | null { return this.formLogin.get('username'); }
  get password(): AbstractControl | null { return this.formLogin.get('password'); }

  // ideally should be 9 digits or alpha numeric char
  private createForm(): void {
    this.formLogin = this.fb.group({
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
