import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTabsModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatRippleModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSelectModule,
} from '@angular/material';
import { UtilsModule } from '@perxtech/core';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    UtilsModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
  ]
})
export class SharedModule { }
