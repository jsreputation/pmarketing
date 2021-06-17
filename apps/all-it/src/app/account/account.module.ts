import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent, AccountModule as BCPAccountModule } from '@perxtech/blackcomb-pages';
import { BadgeServiceModule } from '@perxtech/core';

const routes: Routes = [{
  path: '',
  component: AccountComponent
}];

@NgModule({
  imports: [
    BCPAccountModule,
    RouterModule.forChild(routes),
    BadgeServiceModule.forRoot()
  ]
})
export class AccountModule { }
