import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MatIconModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { LogoModule } from '../logo/logo.module';
import { UserModule } from '../user/user.module';
import { SidenavMenuModule } from '../sidenav-menu/sidenav-menu.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SidenavComponent,
  ],
  exports: [
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LogoModule,
    UserModule,
    SidenavMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    TranslateModule,
  ]
})
export class SidenavModule { }
