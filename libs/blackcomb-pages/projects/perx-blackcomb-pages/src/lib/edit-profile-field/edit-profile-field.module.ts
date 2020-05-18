import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileModule } from '@perxtech/core';
import { EditProfileFieldComponent } from './edit-profile-field.component';

@NgModule({
  declarations: [EditProfileFieldComponent],
  exports: [EditProfileFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forChild(),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ProfileModule,
  ]
})
export class EditProfileFieldModule { }
