import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { SearchResultComponent } from '../../shared/components/search-result/search-result.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MainRoutingModule } from '../main-routing.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { ICampaignService, RewardsModule, RewardsService } from '@perxtech/core';
import { NoResultComponent } from './no-result/no-result.component';
import { ResultComponent } from './result.component';
import { of } from 'rxjs';

const rewardServiceStub: Partial<RewardsService> = {
  searchRewards: () => of()
};

const campaignServiceStub: Partial<ICampaignService> = {
  searchCampaigns: () => of(),
};

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ResultComponent,
        SearchResultComponent,
        SearchHeaderComponent,
        NoResultComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        MainRoutingModule,
        SharedModule,
        MatTabsModule,
        RewardsModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        { provide: RewardsService, useValue: rewardServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },

      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
