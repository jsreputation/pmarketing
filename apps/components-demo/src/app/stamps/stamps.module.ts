import { StampsListComponent } from './stamps-list/stamps-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StampsRoutingModule } from './stamps-routing.module';
import { CardComponent } from './card/card.component';
import { StampsComponent } from './stamps/stamps.component';
import { PuzzlesModule, RewardsModule, ThemesService, CampaignModule, StampModule, ICampaignService, StampService } from '@perx/core';
import { MatSliderModule, MatCheckboxModule, MatTabsModule, MatIconModule } from '@angular/material';
import { mockTheme } from './theme';
import { of } from 'rxjs';
import { campaigns } from './campaign.mock';
import { stampCard, stamp } from './stamps.mock';

const themesServiceStub: Partial<ThemesService> = {
  getThemeSetting: () => of(mockTheme)
};

const campaignServiceStub: Partial<ICampaignService> = { getCampaigns: () => of(campaigns) };
const stampsServiceStub: Partial<StampService> = {
  getCurrentCard: () => of(stampCard),
  getStamps: () => of(),
  putStamp: () => of(stamp)
};
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
  ],
  providers: [
    { provide: ThemesService, useValue: themesServiceStub },
    { provide: ICampaignService, useValue: campaignServiceStub },
    { provide: StampService, useValue: stampsServiceStub }
  ]
})
export class StampsModule { }
