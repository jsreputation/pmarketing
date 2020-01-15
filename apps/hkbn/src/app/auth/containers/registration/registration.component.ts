import { AuthenticationService, IProfile, ICountryCode, GeneralStaticDataService } from '@perx/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISignUpData } from '@perx/core';

const countries = ['China', 'Hong Kong', 'Macau'];

@Component({
  selector: 'hkbn-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  /* istanbul ignore next */
  public countryCodes: ICountryCode[];
  public appAccessTokenFetched: boolean;
  public isSignUpEnded: boolean = true;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private generalStaticDataService: GeneralStaticDataService
  ) { }
  public ngOnInit(): void {
    const token = this.auth.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
    } else {
      this.auth.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
      }, (err) => {
        console.error('Error' + err);
      });
    }
    this.generalStaticDataService.getCountriesList(countries).subscribe((codes) => this.countryCodes = codes);
  }
  public submitHandler(data: ISignUpData): void {
    if (!this.isSignUpEnded) {
      return;
    }

    this.isSignUpEnded = false;
    this.auth.signup(data).subscribe((profile: IProfile) => {
      this.isSignUpEnded = true;
      this.router.navigate(['sms-validation'], { queryParams: { identifier: profile.phone } });
    });
  }
}
