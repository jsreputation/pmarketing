import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceComponent } from './performance.component';
import { MatTabsModule } from '@angular/material/tabs';
import {
  DefaultLangChangeEvent,
  LangChangeEvent,
  TranslateModule,
  TranslateService,
  TranslationChangeEvent
} from '@ngx-translate/core';
import { OverviewComponent } from './overview/overview.component';
import { ActivityComponent } from './activity/activity.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { EventEmitter } from '@angular/core';
import {
  AuthenticationService, ConfigService, ICampaignService, IProfile,
  LoyaltyService, LoyaltySummaryComponent, ProfileService, StatisticCardComponent, TransactionsService
} from '@perxtech/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const translateServiceStub: Partial<TranslateService> = {
  get: () => of(),
  // @ts-ignore
  onLangChange: new EventEmitter<LangChangeEvent>(),
  // @ts-ignore
  onTranslationChange: new EventEmitter<TranslationChangeEvent>(),
  // @ts-ignore
  onDefaultLangChange: new EventEmitter<DefaultLangChangeEvent>()
};

describe('PerformanceComponent', () => {
  let component: PerformanceComponent;
  let fixture: ComponentFixture<PerformanceComponent>;
  const authenticationService = {
    requestVerificationToken: () => of(null)
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

  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: (): Observable<IProfile> => of(),
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([]),
    getLoyalty: () => of(),
    getTransactions: () => of([])
  };

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([]),
    applyReferral: () => of()
  };

  const transactionServiceStub: Partial<TransactionsService> = {
    getTransactionsCountByType: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PerformanceComponent,
        OverviewComponent,
        ActivityComponent,
        LoyaltySummaryComponent,
        StatisticCardComponent
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatTabsModule,
        MatCardModule,
        TranslateModule.forRoot(),
        InfiniteScrollModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatListModule,
        MatSelectModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: AuthenticationService, useValue: authenticationService },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        DatePipe,
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: TransactionsService, useValue: transactionServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
