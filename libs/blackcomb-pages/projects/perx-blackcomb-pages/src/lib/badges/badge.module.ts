import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeListComponent } from './badge-list/badge-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BadgeLandingComponent } from './badge-landing/badge-landing.component';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    TranslateModule,
    InfiniteScrollModule
  ],
  declarations: [BadgeLandingComponent, BadgeListComponent],
  exports: [BadgeLandingComponent, BadgeListComponent]
})

export class BadgeModule { }
