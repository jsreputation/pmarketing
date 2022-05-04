import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadgeLandingComponent, BadgeModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: BadgeLandingComponent
}];

@NgModule({
  imports: [
    BadgeModule,
    RouterModule.forChild(routes)
  ]
})
export class BadgesModule { }
