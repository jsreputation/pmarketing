import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class LandingPageModule { }
