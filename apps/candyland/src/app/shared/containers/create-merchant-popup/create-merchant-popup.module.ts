import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMerchantPopupComponent } from './create-merchant-popup.component';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { MatButtonModule, MatDialogModule, MatIconModule, MatMenuModule } from '@angular/material';
import { CreateMerchantFormModule } from '@cl-shared/components/create-merchant-form/create-merchant-form.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateMerchantPopupComponent
  ],
  exports: [
    CreateMerchantPopupComponent
  ],
  entryComponents: [
    CreateMerchantPopupComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CreateMerchantFormModule,
    ReactiveFormsModule,
    NoDataModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class CreateMerchantPopupModule { }
