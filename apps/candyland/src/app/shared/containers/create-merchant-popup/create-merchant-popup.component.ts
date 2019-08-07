import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
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
              private merchantFormService: MerchantFormService) { }

  public ngOnInit(): void {
    this.createFormMerchant();
  }

  private createFormMerchant(): void {
    this.formMerchant = this.merchantFormService.getMerchantForm();
  }
}
