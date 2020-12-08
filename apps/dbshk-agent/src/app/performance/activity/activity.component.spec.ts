import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityComponent } from './activity.component';
import { MatFormFieldModule, MatSelectModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Config, ConfigService, ICampaignService } from '@perxtech/core';
import { of } from 'rxjs';
import { CampaignInviteService } from '../../campaign-referrals/campaign-invite.service';
import { HttpClientModule } from '@angular/common/http';

describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([]),
    applyReferral: () => of()
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of({
      apiHost: '',
      production: false,
      preAuth: false,
      isWhistler: false,
      baseHref: ''
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityComponent],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatListModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        CampaignInviteService,
        { provide: Config, useValue: configServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
