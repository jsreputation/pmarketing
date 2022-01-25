import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LayoutComponent],
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
