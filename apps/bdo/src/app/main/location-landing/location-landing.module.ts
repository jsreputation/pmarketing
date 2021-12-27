import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationLandingComponent } from './location-landing.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [{
  path: '',
  component: LocationLandingComponent
}];

@NgModule({
  declarations: [
    LocationLandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDividerModule
  ]
})
export class LocationLandingModule { }
