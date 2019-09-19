import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTabsModule,
} from '@angular/material';

import {
  UtilsModule,
  LoyaltyModule,
} from '@perx/core';

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
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

    ReactiveFormsModule,
    FormsModule,
    LoyaltyModule,
  ]
})
export class SharedModule { }
