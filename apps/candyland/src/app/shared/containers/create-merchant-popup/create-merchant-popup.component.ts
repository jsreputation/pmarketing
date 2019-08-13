import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { MerchantFormService } from '@cl-shared/components/create-merchant-form/shared/merchant-form.service';

@Component({
  selector: 'cl-create-merchant-popup',
  templateUrl: './create-merchant-popup.component.html',
  styleUrls: ['./create-merchant-popup.component.scss']
})
export class CreateMerchantPopupComponent implements OnInit {
  public formMerchant: FormGroup;
  public formConfig: IMerchantFormConfig = {
    shoveName: true
  };
  constructor(public dialog: MatDialog,
              private dialogRef: MatDialogRef<CreateMerchantPopupComponent>,
              private merchantFormService: MerchantFormService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: IMerchant) { }

  public ngOnInit(): void {
    this.createFormMerchant();
    this.doPatchFrom(this.data);
  }

  public close(): void {
    this.dialogRef.close();
  }

  public addMerchant(): void {
    this.dialogRef.close(this.formMerchant.value);
  }

  private createFormMerchant(): void {
    this.formMerchant = this.merchantFormService.getMerchantForm();
  }

  private doPatchFrom(data: IMerchant): void {
    if (data) {
      this.merchantFormService.patchMerchantForm(this.formMerchant, {
        name: data.firstName,
        image: data.logo,
        contactNumber: data.phone
      });
    }
  }
}
