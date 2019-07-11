import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { MatIconModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { LogoModule } from '../logo/logo.module';
import { UserModule } from '../user/user.module';
import { SidenavMenuModule } from '../sidenav-menu/sidenav-menu.module';

@NgModule({
  declarations: [
    SideNavComponent,
  ],
  exports: [
    SideNavComponent,
  ],
  imports: [
    CommonModule,
    LogoModule,
    UserModule,
    SidenavMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
  ]
})
export class SideNavModule { }
