import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EngagementsListPageComponent} from './containers/engagements-list-page/engagements-list-page.component';
import {EngagementsComponent} from './containers/engagements/engagements.component';

const routes: Routes = [
  { path: '',
    component: EngagementsComponent,
    children: [
      {
        path: '',
        component: EngagementsListPageComponent
      },
      {
        path: 'new-survey',
        loadChildren: () => import('./new-survey/new-survey.module').then(mod => mod.NewSurveyModule)
      },
      {
        path: 'games',
        loadChildren: () => import('./games/games.module').then(mod => mod.GamesModule)
      },
      {
        path: 'new-stamp',
        loadChildren: () => import('./new-stamp/new-stamp.module').then(mod => mod.NewStampModule)
      },
      {
        path: 'new-instant-reward',
        loadChildren: () => import('./new-instant-reward/new-instant-reward.module').then(mod => mod.NewInstantRewardModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngagementsRoutingModule { }
