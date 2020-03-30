import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuckyDrawComponent } from './lucky-draw/lucky-draw.component';
import { ProfileComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'lucky', component: LuckyDrawComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
