import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent, AccountModule as BCPAccountModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: AccountComponent
}];

@NgModule({
  imports: [
    BCPAccountModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
