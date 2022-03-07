import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarNavItemComponent } from './toolbar-nav-item/toolbar-nav-item.component';

@NgModule({
  declarations: [LayoutComponent, ToolbarNavItemComponent],
  exports: [LayoutComponent],
  imports: [
    LayoutRoutingModule,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    TranslateModule
  ]
})
export class LayoutModule { }
