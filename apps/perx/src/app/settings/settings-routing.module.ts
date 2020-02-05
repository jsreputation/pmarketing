import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: '', redirectTo: 'general' },
      { path: 'general', loadChildren: () => import('./containers/general/general.module').then(m => m.GeneralModule) },
      { path: 'users', loadChildren: () => import('./containers/users/users.module').then(m => m.UsersModule) },
      { path: 'audience', loadChildren: () => import('./containers/audience/audience.module').then(m => m.AudienceModule) },
      { path: 'uploads', loadChildren: () => import('./containers/uploads/uploads.module').then(m => m.UploadsModule) },
      { path: 'roles', loadChildren: () => import('./containers/roles/roles.module').then(m => m.RolesModule) },
      {
        path: 'rule-building',
        loadChildren: () => import('./containers/rule-building/rule-building.module').then(m => m.RuleBuildingModule)
      },
      { path: 'branding', loadChildren: () => import('./containers/branding/branding.module').then(m => m.BrandingModule) },
      { path: 'integrations', loadChildren: () => import('./containers/integrations/integrations.module').then(m => m.IntegrationsModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
