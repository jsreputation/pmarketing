import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  EnterPinComponent,
  PerxBlackcombPagesModule
} from '@perxtech/blackcomb-pages';
import { UtilsModule } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: EnterPinComponent
}];

@NgModule({
  imports: [
    CommonModule,
    PerxBlackcombPagesModule,
    UtilsModule,
    MatToolbarModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ]
})
export class EnterPinModule { }
