import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfileFieldComponent } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ]
})
export class EditProfileFieldModule { }
