import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent, LandingPageModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  { path: '', component: LandingPageComponent }
];

@NgModule({
  imports: [
    LandingPageModule,
    RouterModule.forChild(routes)
  ]
})
export class WelcomeModule { }
