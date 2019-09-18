import { Component } from '@angular/core';
import { AuthenticationService, IProfile, ICountryCode } from '@perx/core';
import { Router } from '@angular/router';
import { ISignUpData } from '@perx/core/dist/perx-core/lib/auth/authentication/models/authentication.model';

@Component({
  selector: 'hkbn-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  /* istanbul ignore next */
  public countryCodes: ICountryCode[];
  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }
  public submitHandler(data: ISignUpData): void {
    this.auth.signup(data).subscribe((profile: IProfile) => {
      this.router.navigate(['sms-validation'], { queryParams: { identifier: profile.phone } });
    });
  }
}
