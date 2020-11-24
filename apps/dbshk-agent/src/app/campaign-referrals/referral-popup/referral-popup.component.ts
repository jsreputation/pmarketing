import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IPopupConfig } from '@perxtech/core';

export interface IReferralPopupConfig extends IPopupConfig {
  description: string;
  addButtonTxt: string;
  namePlaceholder: string;
}

export interface PopUpClosedCallBack {
  closeAndRedirect(url: string): void;
}

interface IReferralName {
  name: string;
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
  public referralNames: IReferralName[];
  public addRefferalNameForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReferralPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReferralPopupConfig,
    private fb: FormBuilder,
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
    // debugger
    // this.dialogRef.close();
    // if (this.data.afterClosedCallBack) {
    //   this.data.afterClosedCallBack.dialogClosed();
    // }
    // if (this.data.afterClosedCallBackRedirect && this.data.url) {
    //   this.data.afterClosedCallBackRedirect.closeAndRedirect(this.data.url);
    // }
  }

  public addName(): void {
    const referral: IReferralName = { name: this.addRefferalNameForm.value.referralName };
    this.addRefferalNameForm.setValue({referralName: ''});
    this.referralNames.push(referral);
  }

  public removeName(name: string): void {
    this.referralNames = this.referralNames.filter((el) => el.name !== name);
  }
}
