import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';
import { ProfileService, AuthenticationService } from '@perx/core';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { of } from 'rxjs';

@Component({
  selector: 'hkbn-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.scss']
})
export class UpdatePhoneComponent implements OnInit {
  public otp: string;
  public updatePhoneGroup: FormGroup = new FormGroup({
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
    private route: ActivatedRoute,
    private dataTransfer: DataTransferService
  ) {
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe((param) => this.otp = param.otp);
    this.dataTransfer.updateData$.pipe(flatMap((val) => val ? of(val.phone) :
      this.profileService.whoAmI().pipe(
        map((profile) => profile.phone)
      ))).subscribe((phone: string) => {
        this.updatePhoneGroup.setValue({ phone });
      });
  }

  public onSubmit(): void {
    this.authService.requestVerificationToken(this.updatePhoneGroup.value.phone)
      .subscribe(() => {
        this.dataTransfer.newxUpdateData(this.updatePhoneGroup.value);
        this.router.navigate(['account', 'verify_token', 'phone'], { queryParams: this.updatePhoneGroup.value })
      });
  }
}
