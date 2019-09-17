import { Component } from '@angular/core';
import { AuthenticationService, IProfile } from '@perx/core';
import { Router } from '@angular/router';
import { ISignUpData } from '@perx/core/dist/perx-core/lib/auth/authentication/models/authentication.model';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ICountryCode, countryCodes } from 'src/assets/mock/country-code';

@Component({
  selector: 'hkbn-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  /* istanbul ignore next */
  countryCodes: ICountryCode[] = countryCodes;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private dataTransfer: DataTransferService
  ) { }
  public submitHandler(data: ISignUpData): void {
    this.auth.signup(data).subscribe((profile: IProfile) => {
      this.dataTransfer.newxUpdateData(data);
      this.router.navigate(['sms-validation'], { queryParams: { identifier: profile.phone } });
    });
  }
}
