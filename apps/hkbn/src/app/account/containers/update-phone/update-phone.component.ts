import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ProfileService, AuthenticationService, GeneralStaticDataService } from '@perx/core';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ICountryCode } from '@perx/core/dist/perx-core/lib/utils/general-static-data/country-code';

@Component({
  selector: 'hkbn-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.scss']
})
export class UpdatePhoneComponent implements OnInit {
  public otp: string;
  public countryCodes: ICountryCode[];
  public updatePhoneGroup: FormGroup = new FormGroup({
    code: new FormControl(null, [
      HkbnValidators.required
    ]),
    phone: new FormControl(null, [
      HkbnValidators.required,
      HkbnValidators.pattern('^[0-9]+$'),
      HkbnValidators.minLength(8),
      HkbnValidators.maxLength(11)])
  });
  public get newNumber(): string {
    return this.updatePhoneGroup.value.code + this.updatePhoneGroup.value.phone;
  }
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private staticDataService: GeneralStaticDataService
  ) {
  }

  public ngOnInit(): void {
    this.staticDataService.getCountriesList().subscribe((countries) => this.countryCodes = countries);
    this.route.queryParams.subscribe((param) => this.otp = param.otp);
    this.profileService.whoAmI().pipe(
      map((profile) => profile.phone)
    ).subscribe((phone: string) => {
      this.updatePhoneGroup.setValue({ phone: phone.substr(3), code: 11 });
    });
  }

  public onSubmit(): void {
    this.authService.requestVerificationToken(this.newNumber)
      .subscribe(() => this.router.navigate(['account', 'verify_token', 'phone'], { queryParams: { phone: this.newNumber } }));
  }
}
