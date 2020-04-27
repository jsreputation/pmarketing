import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EnterPinComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { UtilsModule } from '@perxtech/core';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{
  path: '',
  component: EnterPinComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UtilsModule,
    SharedModule,
    PerxBlackcombPagesModule,
    TranslateModule.forChild()
  ]
})
export class OtpModule { }
