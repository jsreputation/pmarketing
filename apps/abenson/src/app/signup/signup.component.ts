import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@perx/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public errorMessage: string;
  public hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    const password: string = this.signUpForm.get('password').value;

    this.errorMessage = null;
    const profile = this.signUpForm.value;
    profile.password_confirmation = password;

    this.authService.signup(profile).subscribe(() => {}, (e) => {console.log(e); });
  }
}
