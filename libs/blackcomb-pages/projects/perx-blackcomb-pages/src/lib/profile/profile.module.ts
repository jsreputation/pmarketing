import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { LoyaltyModule, ProfileModule as PerxCoreProfileModule, ProfileServiceModule  } from '@perxtech/core';

@NgModule({
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    PerxCoreProfileModule,
    ProfileServiceModule.forChild(),
    LoyaltyModule
  ]
})
export class ProfileModule { }
