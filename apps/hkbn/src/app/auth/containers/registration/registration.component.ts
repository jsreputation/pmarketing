import { Component, OnInit } from '@angular/core';
import { AuthenticationService, IProfile, GeneralStaticDataService } from '@perx/core';
import { Router } from '@angular/router';
import { ISignUpData } from '@perx/core/dist/perx-core/lib/auth/authentication/models/authentication.model';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ICountryCode } from '@perx/core';

@Component({
  selector: 'hkbn-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  /* istanbul ignore next */
  public countryCodes: ICountryCode[];
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private dataTransfer: DataTransferService,
    private generalStaticDataService: GeneralStaticDataService
  ) { }
  public ngOnInit(): void {
    this.generalStaticDataService.getCountriesList().subscribe((countries) => this.countryCodes = countries);
  }
  public submitHandler(data: ISignUpData): void {
    this.auth.signup(data).subscribe((profile: IProfile) => {
      this.dataTransfer.newxUpdateData(data);
      this.router.navigate(['sms-validation'], { queryParams: { identifier: profile.phone } });
    });
  }
}
