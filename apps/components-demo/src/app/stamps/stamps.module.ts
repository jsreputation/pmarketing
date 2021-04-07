import { StampsListComponent } from './stamps-list/stamps-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StampsRoutingModule } from './stamps-routing.module';
import { CardComponent } from './card/card.component';
import { StampsComponent } from './stamps/stamps.component';
import { PuzzlesModule, RewardsModule, CampaignModule, StampModule } from '@perxtech/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [CardComponent, StampsComponent, StampsListComponent],
  imports: [
    CommonModule,
    StampsRoutingModule,
    MatSliderModule,
    MatCheckboxModule,
    MatIconModule,
    PuzzlesModule,
    MatTabsModule,
    RewardsModule,
    CampaignModule,
    StampModule
  ]
})
export class StampsModule { }
