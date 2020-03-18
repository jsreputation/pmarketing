import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTabsModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import {
  UtilsModule,
  LoyaltyModule,
} from '@perxtech/core';

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    UtilsModule,
    ReactiveFormsModule,
    FormsModule,
    LoyaltyModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    LoyaltyModule,
  ]
})
export class SharedModule { }
