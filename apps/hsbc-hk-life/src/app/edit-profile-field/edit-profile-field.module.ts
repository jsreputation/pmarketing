import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfileFieldComponent, PerxBlackcombPagesModule } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{
  path: '',
  component: EditProfileFieldComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PerxBlackcombPagesModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ]
})
export class EditProfileFieldModule { }
