import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarNavItemComponent } from './toolbar-nav-item/toolbar-nav-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LayoutComponent, ToolbarNavItemComponent],
  exports: [LayoutComponent, ToolbarNavItemComponent],
  imports: [
    LayoutRoutingModule,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    TranslateModule,
    RouterModule
  ]
})
export class LayoutModule { }
