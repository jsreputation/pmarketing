import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IProfile, AuthenticationService, ProfileService, NotificationService } from '@perx/core';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'hkbn-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSummaryComponent implements OnChanges {
  @Input() public accountData: IProfile;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private profileService: ProfileService,
    private ntfs: NotificationService
  ) { }

  public accountSummary: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl(''),
    email: new FormControl(),
    pass: new FormControl(),
    customProperties: new FormGroup({
      subscribe_notification: new FormControl(false)
    })
  });

  public ngOnChanges(): void {
    if (this.accountData) {
      this.accountSummary.patchValue(this.accountData);
    }
  }

  public updateMobileVerification(event: Event, type: string): void {
    event.preventDefault();
    this.authService.requestVerificationToken().subscribe(() => {
      this.router.navigate(['account/verify_token', type]);
    });
  }
  public agreement(event: MatSlideToggleChange): void {
    this.profileService.setCustomProperties({ subscribe_notification: event.checked }).subscribe(() => {
    },
      (err) => {
        this.ntfs.addSnack(err);
      });
  }
}
