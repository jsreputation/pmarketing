import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';
import { ProfileService, AuthenticationService, GeneralStaticDataService } from '@perx/core';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ICountryCode } from '@perx/core';
import { of } from 'rxjs';
import { DataTransferService } from 'src/app/services/data-transfer.service';

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
    return this.updatePhoneGroup.value.code.replace('+', '') + this.updatePhoneGroup.value.phone;
  }
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private staticDataService: GeneralStaticDataService,
    private dataTransfer: DataTransferService
  ) {
  }

  public ngOnInit(): void {
    this.staticDataService.getCountriesList().subscribe((countries) => this.countryCodes = countries);
    this.route.queryParams.subscribe((param) => this.otp = param.otp);
    this.dataTransfer.updateData$.pipe(flatMap((val) => val ? of(val) :
      this.profileService.whoAmI().pipe(
        map((profile) => ({ phone: profile.phone.substr(3), code: '+852' }))
      ))).subscribe((phonePrew) => {
        this.updatePhoneGroup.setValue(phonePrew);
      });
  }

  public onSubmit(): void {
    this.authService.requestVerificationToken(this.newNumber)
      .subscribe(() => {
        this.dataTransfer.newxUpdateData(this.updatePhoneGroup.value);
        this.router.navigate(['account', 'verify_token', 'phone'], { queryParams: { phone: this.newNumber } });
      });
  }
}
