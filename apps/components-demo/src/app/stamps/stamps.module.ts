import { StampsListComponent  } from './stamps-list/stamps-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StampsRoutingModule } from './stamps-routing.module';
import { CardComponent } from './card/card.component';
import { StampsComponent } from './stamps/stamps.component';
import { PuzzlesModule, RewardsModule } from '@perx/core';
import { MatSliderModule, MatCheckboxModule, MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [CardComponent, StampsComponent, StampsListComponent ],
  imports: [
    CommonModule,
    StampsRoutingModule,
    MatSliderModule,
    MatCheckboxModule,
    PuzzlesModule,
    MatTabsModule,
    RewardsModule
  ]
})
export class StampsModule { }
