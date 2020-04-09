import { Component, Input, OnChanges, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IProfile, ProfileService, NotificationService } from '@perxtech/core';
import { MatSlideToggleChange } from '@angular/material';
import { DataTransferService } from '../../../services/data-transfer.service';

@Component({
  selector: 'hkbn-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSummaryComponent implements OnChanges, OnInit {
  @Input() public accountData: IProfile;

  public accountSummary: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl(''),
    email: new FormControl(),
    pass: new FormControl('*'.repeat(10)),
    customProperties: new FormGroup({
      subscribe_notification: new FormControl(false)
    })
  });

  constructor(
    public router: Router,
    private profileService: ProfileService,
    private ntfs: NotificationService,
    private dataTransfer: DataTransferService
  ) { }

  public ngOnInit(): void {
    this.dataTransfer.newxUpdateData(null);
  }

  public ngOnChanges(): void {
    if (this.accountData) {
      this.accountSummary.patchValue(this.accountData);
    }
  }

  public agreement(event: MatSlideToggleChange): void {
    this.profileService.setCustomProperties({ subscribe_notification: event.checked }).subscribe(
      () => { },
      (err) => this.ntfs.addSnack(err)
    );
  }
}
