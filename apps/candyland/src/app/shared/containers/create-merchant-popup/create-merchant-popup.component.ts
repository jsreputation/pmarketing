import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
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
              private merchantFormService: MerchantFormService) { }

  public ngOnInit(): void {
    this.createFormMerchant();
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
}
