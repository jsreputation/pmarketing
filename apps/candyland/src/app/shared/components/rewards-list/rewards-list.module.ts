import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatMenuModule, MatSortModule, MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ButtonModule, ProgressBarModule } from '@perx/candyshop';
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
