import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'cl-create-merchant-popup',
  templateUrl: './create-merchant-popup.component.html',
  styleUrls: ['./create-merchant-popup.component.scss']
})
export class CreateMerchantPopupComponent implements OnInit {
  public formMerchant: FormGroup;
  public formConfig: IMerchantFormConfig = {
    title: 'Create Merchant',
    shoveName: true
  };
  constructor(private fb: FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.createFormMerchant();
  }

  private createFormMerchant(): void {
    this.formMerchant = this.fb.group({
      name: ['Merchant 1', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      image: [null, [Validators.required]],
      description: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(120)]],
      countryCode: [null, [Validators.required]],
      contactNumber: [null, [Validators.required]]
    });
  }
}
