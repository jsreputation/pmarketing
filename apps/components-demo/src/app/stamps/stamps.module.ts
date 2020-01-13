import { StampsListComponent } from './stamps-list/stamps-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StampsRoutingModule } from './stamps-routing.module';
import { CardComponent } from './card/card.component';
import { StampsComponent } from './stamps/stamps.component';
import { PuzzlesModule, RewardsModule, ThemesService } from '@perx/core';
import { MatSliderModule, MatCheckboxModule, MatTabsModule, MatIconModule } from '@angular/material';

const themesServiceSTUB = {}

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
    RewardsModule
  ],
  providers: [
    { provide: ThemesService, useValue: themesServiceSTUB }
  ]
})
export class StampsModule { }
