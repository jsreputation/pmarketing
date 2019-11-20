import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule, MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { CreateMerchantFormComponent } from './create-merchant-form.component';
import { ButtonModule } from '../button/button.module';
import { UploadGraphicModule } from '@cl-shared/components/upload-graphic/upload-graphic.module';
import { UtilsModule } from '@perx/core';
import { MerchantBranchComponent } from './merchant-branch/merchant-branch.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateMerchantFormComponent,
    MerchantBranchComponent
  ],
  exports: [
    CreateMerchantFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    UploadGraphicModule,

    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,

    UtilsModule,
    TranslateModule,
  ]
})
export class CreateMerchantFormModule { }
