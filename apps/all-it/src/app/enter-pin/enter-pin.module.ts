import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EnterPinComponent } from '@perx/blackcomb-pages';
import { UtilsModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{
  path: '',
  component: EnterPinComponent
}];

@NgModule({
  declarations: [
    EnterPinComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ]
})
export class EnterPinModule { }
