import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeListComponent } from './badge-list/badge-list.component';
import { BadgeDetailComponent } from './badge-detail/badge-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BadgeLandingComponent } from './badge-landing/badge-landing.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    TranslateModule
  ],
  declarations: [BadgeLandingComponent, BadgeListComponent, BadgeDetailComponent],
  exports: [BadgeLandingComponent, BadgeListComponent, BadgeDetailComponent]
})

export class BadgeModule { }
