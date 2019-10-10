import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { AudiencesService } from '@cl-core-services';
import { LoyaltyFormsService } from 'src/app/loyalty/services/loyalty-forms.service';

@Component({
  selector: 'cl-tier-setup-popup',
  templateUrl: './tier-setup-popup.component.html',
  styleUrls: ['./tier-setup-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TierSetupPopupComponent implements OnInit {
  public form: FormGroup;
  public pools: any;
  public config: { [key: string]: OptionConfig[] } = {
    gender: [
      {title: 'Male', value: 'male'},
      {title: 'Female', value: 'female'}
    ],
    country: [
      {title: 'Country 1', value: 'country1'},
      {title: 'Country 2', value: 'country2'}
    ],
    audienceList: [
      {title: 'Gold_users', value: 'Gold_users'},
      {title: 'Silver tier', value: 'Silver_tier'},
      {title: 'Bronze tier', value: 'Bronze_tier'}
    ]
  };

  constructor(public dialogRef: MatDialogRef<TierSetupPopupComponent>,
              private loyaltyFormsService: LoyaltyFormsService,
              private audiencesService: AudiencesService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.getPools();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public add(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  private initForm(): void {
    this.form = this.loyaltyFormsService.getTireForm();
  }

  private getPools(): any {
    this.audiencesService.getAudiencesList()
      .subscribe((data: any) => {
        this.pools = data;
      });
  }
}
