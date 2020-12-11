import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService, LoyaltyService, LoyaltySummaryComponent, ProfileService, StatisticCardComponent } from '@perxtech/core';
import { MaterialModule } from 'libs/core/projects/perx-core/src/lib/shared/material.module';
import { of } from 'rxjs';
import { CampaignInviteService } from '../../campaign-referrals/campaign-invite.service';
import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  const profileServiceStub = {
    whoAmI: () => of(null)
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([]),
    getLoyalty: () => of(),
    getTransactions: () => of([])
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
      declarations: [OverviewComponent, StatisticCardComponent, LoyaltySummaryComponent],
      imports: [
        MaterialModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        HttpClientModule
      ],
      providers: [
        DatePipe,
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        {
          provide: TranslateService, useValue: {
            get: () => of()
          }
        },
        CampaignInviteService,
        { provide: ConfigService, useValue: configServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
