import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  CreateTeamComponent,
  JoinTeamComponent,
  PendingTeamComponent,
  TeamsModule as BCPTeamsModule
} from '@perxtech/blackcomb-pages';

const routes: Routes = [
  {
    path: 'create/:campaignId',
    component: CreateTeamComponent
  },
  {
    path: 'join/:campaignId',
    component: JoinTeamComponent
  },
  {
    path: 'pending/:campaignId',
    component: PendingTeamComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'create'
  },
];

@NgModule({
  imports: [
    CommonModule,
    BCPTeamsModule,
    RouterModule.forChild(routes)
  ]
})
export class TeamsModule {
}
