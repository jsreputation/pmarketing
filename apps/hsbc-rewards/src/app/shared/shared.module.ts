import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  MatSidenavModule 
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
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
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class SharedModule { }
