import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { MatListModule, MatIconModule } from '@angular/material';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    PerxBlackcombPagesModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
