import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'warn'
      }
    }
  ],
  entryComponents: [SnackbarComponent],
  exports: [SnackbarComponent, MatSnackBarModule]
})
export class SnackbarModule {
}
