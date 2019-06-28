import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewShakePageComponent} from './containers/new-shake-page/new-shake-page.component';
import {NewShakeSettingsPageComponent} from './containers/new-shake-settings-page/new-shake-settings-page.component';
import {NewShakeRewardsPageComponent} from './containers/new-shake-rewards-page/new-shake-rewards-page.component';
import {NewPinataPageComponent} from './containers/new-pinata-page/new-pinata-page.component';
import {NewPinataDisplayPageComponent} from './containers/new-pinata-display-page/new-pinata-display-page.component';
import {NewPinataRewardsPageComponent} from './containers/new-pinata-rewards-page/new-pinata-rewards-page.component';
import {NewTapPageComponent} from './containers/new-tap-page/new-tap-page.component';
import {NewTapDisplayPageComponent} from './containers/new-tap-display-page/new-tap-display-page.component';
import {NewTapSettingsPageComponent} from './containers/new-tap-settings-page/new-tap-settings-page.component';
import {GameComponent} from './containers/game/game.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/new-shake'
  },
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: 'new-shake',
        component: NewShakePageComponent,
        children: [
          {
            path: 'settings',
            component: NewShakeSettingsPageComponent
          },
          {
            path: 'rewards',
            component: NewShakeRewardsPageComponent
          }
        ]
      },
      {
        path: 'new-pinata',
        component: NewPinataPageComponent,
        children: [
          {
            path: 'display',
            component: NewPinataDisplayPageComponent
          },
          {
            path: 'rewards',
            component: NewPinataRewardsPageComponent
          }
        ]
      },
      {
        path: 'new-tap',
        component: NewTapPageComponent,
        children: [
          {
            path: 'display',
            component: NewTapDisplayPageComponent
          },
          {
            path: 'settings',
            component: NewTapSettingsPageComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule {
}
