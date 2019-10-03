import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { ConfirmModalComponent } from './confirm-modal.component';
import { MatDialogModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [ConfirmModalComponent],
  exports: [
    ConfirmModalComponent
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    ButtonModule
  ]
})
export class ConfirmModalModule {
}
