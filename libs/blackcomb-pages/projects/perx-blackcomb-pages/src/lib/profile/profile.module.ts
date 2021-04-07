import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { LoyaltyModule, ProfileModule as PerxCoreProfileModule, ProfileServiceModule  } from '@perxtech/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    TranslateModule.forChild(),
    LoyaltyModule,
    MatCheckboxModule
  ]
})
export class ProfileModule { }
