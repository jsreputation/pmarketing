import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ProfileService, AuthenticationService } from '@perx/core';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { countryCodes, ICountryCode } from 'src/assets/mock/country-code';

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

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.countryCodes = countryCodes;
    this.route.queryParams.subscribe((param) => this.otp = param.otp);
    this.profileService.whoAmI().pipe(
      map((profile) => profile.phone)
    ).subscribe((phone: string) => {   
      this.updatePhoneGroup.setValue({ phone, code: 1 });
    });
  }

  public onSubmit(): void {
    this.authService.requestVerificationToken(this.updatePhoneGroup.value.phone)
      .subscribe(() => this.router.navigate(['account', 'verify_token', 'phone'], {queryParams: this.updatePhoneGroup.value }));
  }
}
