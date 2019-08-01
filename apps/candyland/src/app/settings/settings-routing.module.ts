import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './containers/settings/settings.component';
import { GeneralComponent } from './containers/general/general.component';
import { BrandingComponent } from './containers/branding/branding.component';
import { CommunicationsComponent } from './containers/communications/communications.component';
import { UsersRolesComponent } from './containers/users-roles/users-roles.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        component: GeneralComponent
      },
      {
        path: 'branding',
        component: BrandingComponent
      },
      {
        path: 'communications',
        component: CommunicationsComponent
      },
      {
        path: 'users-roles',
        component: UsersRolesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
