import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule
} from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { NoDataModule, PaginationModule } from '@cl-shared/table';
import { LoyaltyGridComponent } from 'src/app/loyalty/components/loyalty-grid/loyalty-grid.component';
import { LoyaltyItemComponent } from 'src/app/loyalty/components/loyalty-item/loyalty-item.component';
import { LoyaltyListPageComponent } from './containers/loyalty-list-page/loyalty-list-page.component';
import { LoyaltyComponent } from './containers/loyalty/loyalty.component';
import { LoyaltyRoutingModule } from './loyalty-routing.module';

@NgModule({
  declarations: [
    LoyaltyComponent,
    LoyaltyListPageComponent,
    LoyaltyGridComponent,
    LoyaltyItemComponent
  ],
  imports: [
    CommonModule,
    LoyaltyRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    PaginationModule,
    NoDataModule,
    StatusLabelModule
  ]
})
export class LoyaltyModule { }
