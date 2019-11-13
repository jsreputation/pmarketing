import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavMenuComponent } from './sidenav-menu.component';
import { SidenavMenuItemComponent } from './sidenav-menu-item/sidenav-menu-item.component';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SidenavMenuComponent,
    SidenavMenuItemComponent,
  ],
  exports: [
    SidenavMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    TranslateModule,
  ]
})
export class SidenavMenuModule { }
