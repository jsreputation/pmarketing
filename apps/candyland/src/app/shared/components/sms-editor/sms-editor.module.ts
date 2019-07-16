import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsEditorComponent } from './sms-editor.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SmsEditorComponent],
  exports: [SmsEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SmsEditorModule {
}
