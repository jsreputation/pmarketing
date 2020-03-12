import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent, PerxBlackcombPagesModule } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { MatListModule, MatIconModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: ProfileComponent
}];

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
