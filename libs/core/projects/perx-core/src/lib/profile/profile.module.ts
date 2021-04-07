import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MicroProfileComponent } from './micro-profile/micro-profile.component';
import { ProfileSummaryComponent } from './profile-summary/profile-summary.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: [UserProfileComponent, MicroProfileComponent, ProfileSummaryComponent],
  exports: [UserProfileComponent, MicroProfileComponent, ProfileSummaryComponent]
})
export class ProfileModule {
}
