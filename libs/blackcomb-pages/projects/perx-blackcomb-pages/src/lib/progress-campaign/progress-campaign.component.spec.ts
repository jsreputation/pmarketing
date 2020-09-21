import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressCampaignComponent } from './progress-campaign.component';
import {
  ConfigService,
  ICampaignService,
  RewardsModule,
  SettingsService
} from '@perxtech/core';
import {
  ActivatedRoute,
  convertToParamMap
} from '@angular/router';
import { of } from 'rxjs';

const campaignServiceStub: Partial<ICampaignService> = {
  getCampaign: () => of(),
};
const settingsServiceStub: Partial<SettingsService> = {
  getRemoteFlagsSettings: () => of()
};
const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of()
};

describe('ProgressCampaignComponent', () => {
  let component: ProgressCampaignComponent;
  let fixture: ComponentFixture<ProgressCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressCampaignComponent ],
      imports: [
        RewardsModule
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
