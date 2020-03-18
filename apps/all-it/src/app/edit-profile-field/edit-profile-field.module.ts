import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfileFieldComponent } from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{
  path: '',
  component: EditProfileFieldComponent
}];

@NgModule({
  declarations: [
    EditProfileFieldComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ]
})
export class EditProfileFieldModule { }
