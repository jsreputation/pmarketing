import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EditProfileFieldComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{
  path: '',
  component: EditProfileFieldComponent
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PerxBlackcombPagesModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ]
})
export class EditProfileFieldModule { }
