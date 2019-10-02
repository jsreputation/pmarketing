import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AccountComponent, ContactUsComponent } from '@perx/core';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'account' },
    { path: 'account', component: AccountComponent },
    { path: 'ccontact-us', component: ContactUsComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
