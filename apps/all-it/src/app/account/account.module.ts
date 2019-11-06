import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '@perx/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '@perx/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: AccountComponent
}];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
