import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewStampComponent } from './containers/new-stamp/new-stamp.component';
import { NewStampSettingsPageComponent } from './containers/new-stamp-settings-page/new-stamp-settings-page.component';
import { NewStampRulesPageComponent } from './containers/new-stamp-rules-page/new-stamp-rules-page.component';
import { NewStampDisplayPageComponent } from './containers/new-stamp-display-page/new-stamp-display-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'settings'},
  {
    path: '',
    component: NewStampComponent,
    children: [
      {
        path: 'settings',
        component: NewStampSettingsPageComponent
      },
      {
        path: 'rules',
        component: NewStampRulesPageComponent
      },
      {
        path: 'display',
        component: NewStampDisplayPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewStampRoutingModule {
}
