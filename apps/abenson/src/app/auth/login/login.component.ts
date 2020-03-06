import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import {
  AuthenticationService, ConfigService, IConfig,
  NotificationService,
} from '@perx/core';
import {IAbensonConfig} from '../../model/IAbenson.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage?: string;
  public preAuth: boolean;
  public appAccessTokenFetched: boolean;
  public useSignUpButton: boolean = true;
  public phonePrefix: string;

  public get mobileNumber(): AbstractControl | null {
    return this.loginForm.get('mobileNumber');
  }

  public get pinCode(): AbstractControl | null {
    return this.loginForm.get('pinCode');
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private configService: ConfigService
  ) {
  }

  public ngOnInit(): void {
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
      }, (err) => {
        console.error(`Error${  err}`);
      });
    }
    this.configService.readAppConfig<IAbensonConfig>().subscribe(
      (config: IConfig<IAbensonConfig>) => this.phonePrefix = config && config.custom && config.custom.phonePrefix || ''
    );
    this.initForm();
  }

  public initForm(): void {
    this.loginForm = this.fb.group({
      mobileNumber: ['', Validators.required],
      pinCode: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    const username = `${this.phonePrefix}${this.loginForm.value.mobileNumber}` as string;
    const password: string = this.loginForm.value.pinCode;
    this.errorMessage = undefined;

    this.authService.login(username, password).subscribe(
      () => {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          (window as any).primaryIdentifier = username;
        }
        this.router.navigate(['card']);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.notificationService.addPopup({
              title: 'We could not reach the server',
              text: 'Please try again soon'
            });
          } else if (err.status === 401) {
            [this.loginForm.controls.mobileNumber, this.loginForm.controls.pinCode]
              .forEach(c => c.setErrors({
                invalid: true
              }));
            this.errorMessage = 'Invalid credentials';
          }
        } else {
          this.errorMessage = err;
        }
      }
    );
  }
}
