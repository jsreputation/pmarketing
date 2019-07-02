import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavMenuComponent } from './sidenav-menu.component';
import { SidenaveMenuItemComponent } from './sidenave-menu-item/sidenave-menu-item.component';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SidenavMenuComponent,
    SidenaveMenuItemComponent,
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
  ]
})
export class SidenavMenuModule { }
