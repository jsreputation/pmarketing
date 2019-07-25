import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CreateMerchantFormComponent } from './create-merchant-form.component';
import { ButtonModule } from '../button/button.module';
import { UploadGraphicModule } from '@cl-shared/components/upload-graphic/upload-graphic.module';

@NgModule({
  declarations: [
    CreateMerchantFormComponent
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
    MatSelectModule
  ]
})
export class CreateMerchantFormModule { }
