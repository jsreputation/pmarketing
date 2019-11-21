import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatMenuModule, MatSortModule, MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { ProgressBarModule } from '@cl-shared/components/progress-bar/progress-bar.module';
import { RewardsListComponent } from './rewards-list.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RewardsListComponent
  ],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule,
    ProgressBarModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    RewardsListComponent
  ]
})
export class RewardsListModule { }
