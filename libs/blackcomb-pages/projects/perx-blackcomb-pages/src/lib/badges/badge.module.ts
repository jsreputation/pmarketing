import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeListComponent } from './badge-list/badge-list.component';
import { BadgeDetailComponent } from './badge-detail/badge-detail.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule
  ],
  declarations: [BadgeListComponent, BadgeDetailComponent],
  exports: [BadgeListComponent, BadgeDetailComponent]
})

export class BadgeModule { }
