import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPopupConfig, NotificationService } from '@perxtech/core';
import { CampaignInviteService } from '../campaign-invite.service';
import { IInvite } from '../models/campaign-referral.model';

export interface IReferralPopupConfig extends IPopupConfig {
  description: string;
  addButtonTxt: string;
  namePlaceholder: string;
  inviteSuccessMessage: string;
  inviteFailureMessage: string;
  campaignId: number;
}

export interface PopUpClosedCallBack {
  closeAndRedirect(url: string): void;
}

@Component({
  selector: 'perx-core-referral-popup',
  templateUrl: './referral-popup.component.html',
  styleUrls: ['./referral-popup.component.scss']
})
export class ReferralPopupComponent implements OnInit {

  public title: string;
  public description: string;
  public buttonTxt: string;
  public addButtonTxt: string;
  public namePlaceholder: string;
  public referralNames: string[];
  public addRefferalNameForm: FormGroup;
  public inviteSuccessMessage: string;
  public inviteFailureMessage: string;
  public showButton: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ReferralPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReferralPopupConfig,
    @Inject(MAT_DIALOG_DATA) public dataPopup: IPopupConfig,
    private fb: FormBuilder,
    private campaignInviteService: CampaignInviteService,
    private notificationService: NotificationService
  ) {
    if (data.disableOverlayClose) {
      dialogRef.disableClose = data.disableOverlayClose;
    }
    if (data.title) {
      this.title = data.title;
    }
    if (data.description) {
      this.description = data.description;
    }
    if (data.buttonTxt) {
      this.buttonTxt = data.buttonTxt;
    }
    if (data.addButtonTxt) {
      this.addButtonTxt = data.addButtonTxt;
    }
    if (data.namePlaceholder) {
      this.namePlaceholder = data.namePlaceholder;
    }

    if (dataPopup.hideButton) {
      this.showButton = false;
    }
    this.inviteSuccessMessage = data.inviteSuccessMessage;
    this.inviteFailureMessage = data.inviteFailureMessage;
    this.referralNames = [];
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addRefferalNameForm = this.fb.group({
      referralName: ['', Validators.required],
    });
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public buttonPressed(): void {
    // build IInvite obj with campaign id + this.referralNames
    const invite: IInvite = { campaign_id: this.data.campaignId, invitee_names: this.referralNames };
    this.campaignInviteService.sendInvite(invite)
      .subscribe(
        () => {
          this.notificationService.addSnack(this.inviteSuccessMessage);
          // trigger share modal
          if (this.data.afterClosedCallBack) {
            this.data.afterClosedCallBack.dialogClosed();
          }
        },
        (error) => { this.notificationService.addSnack(this.inviteFailureMessage); console.error(error); }
      );
  }

  public addName(): void {
    this.referralNames.push(this.addRefferalNameForm.value.referralName);
    this.addRefferalNameForm.setValue({ referralName: '' });
  }

  public removeName(nametoRemove: string): void {
    this.referralNames = this.referralNames.filter((name) => name !== nametoRemove);
  }
}
