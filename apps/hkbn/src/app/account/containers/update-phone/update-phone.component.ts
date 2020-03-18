import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthenticationService, GeneralStaticDataService, ICountryCode } from '@perxtech/core';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferService } from 'src/app/services/data-transfer.service';

const countries = ['China', 'Hong Kong', 'Macau'];

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
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private staticDataService: GeneralStaticDataService,
    private dataTransfer: DataTransferService
  ) {
  }

  public ngOnInit(): void {
    this.staticDataService.getCountriesList(countries).subscribe((codes) => this.countryCodes = codes);
    this.route.queryParams.subscribe((param) => this.otp = param.otp);
    this.dataTransfer.updateData$
      .pipe(map((val) => val ? val : { phone: '', code: '+852' }))
      .subscribe((update) => this.updatePhoneGroup.setValue(update));
  }

  public onSubmit(): void {
    this.authService.requestVerificationToken(this.newNumber)
      .subscribe(() => {
        this.dataTransfer.newxUpdateData(this.updatePhoneGroup.value);
        this.router.navigate(['account', 'verify_token', 'phone'], { queryParams: { phone: this.newNumber } });
      });
  }
}
