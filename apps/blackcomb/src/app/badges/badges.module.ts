import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadgeLandingComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: BadgeLandingComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BadgesModule { }
