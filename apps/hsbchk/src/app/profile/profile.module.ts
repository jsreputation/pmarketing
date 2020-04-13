import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { MatListModule, MatIconModule } from '@angular/material';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    PerxBlackcombPagesModule,
    ProfileRoutingModule,
    TranslateModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
