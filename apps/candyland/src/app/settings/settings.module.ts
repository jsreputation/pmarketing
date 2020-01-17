import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { MatTabsModule } from '@angular/material';
import { SettingsComponent } from './containers/settings/settings.component';
import { GeneralModule } from './containers/general/general.module';
import { BrandingModule } from './containers/branding/branding.module';
import { CommunicationsModule } from './containers/communications/communications.module';
import { UsersRolesModule } from './containers/users-roles/users-roles.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    GeneralModule,
    BrandingModule,
    CommunicationsModule,
    UsersRolesModule,
    MatTabsModule,
    TranslateModule,
  ]
})
export class SettingsModule { }
