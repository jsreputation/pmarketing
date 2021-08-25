import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule.forChild()
  ],
  providers: []
})
export class LandingPageModule { }
