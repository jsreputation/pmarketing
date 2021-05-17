import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadgeDetailComponent, BadgeLandingComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: BadgeLandingComponent
},
{
  path: 'details/:id',
  component: BadgeDetailComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BadgesModule { }
