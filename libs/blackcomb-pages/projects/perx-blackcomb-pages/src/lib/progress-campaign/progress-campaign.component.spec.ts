import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ProgressCampaignComponent } from './progress-campaign.component';
import {
  ConfigService,
  ICampaignService,
  LoyaltyService,
  ProgressBarModule,
  RewardsModule,
  SettingsService,
  StampService
} from '@perxtech/core';
import {
  ActivatedRoute,
  convertToParamMap
} from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ProgressInfoPipe } from './progress-pipes/info/progress-info.pipe';

const campaignServiceStub: Partial<ICampaignService> = {
  getCampaign: () => of(),
};
const settingsServiceStub: Partial<SettingsService> = {
  getRemoteFlagsSettings: () => of()
};
const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of()
};
const loyaltyServiceStub: Partial<LoyaltyService> = {
  getLoyalty: () => of()
};
const stampServiceStub: Partial<StampService> = {
  getCards: () => of()
};

describe('ProgressCampaignComponent', () => {
  let component: ProgressCampaignComponent;
  let fixture: ComponentFixture<ProgressCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressCampaignComponent, ProgressInfoPipe ],
      imports: [
		    RouterTestingModule,
        RewardsModule,
        MatCardModule,
        ProgressBarModule
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({ id: 1 }))
          }
        },
        { provide: ICampaignService, useValue: campaignServiceStub},
        { provide: ConfigService, useValue: configServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
        { provide: StampService, value: stampServiceStub },
        { provide: LoyaltyService, value: loyaltyServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
