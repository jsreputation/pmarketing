import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { MatListModule, MatIconModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: ProfileComponent
}];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
