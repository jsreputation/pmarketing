import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';
import { SettingsMobilePreviewComponent } from './settings-mobile-preview.component';

@NgModule({
  declarations: [
    SettingsMobilePreviewComponent
  ],
  exports: [
    SettingsMobilePreviewComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule
  ]
})
export class SettingsMobilePreviewModule { }
