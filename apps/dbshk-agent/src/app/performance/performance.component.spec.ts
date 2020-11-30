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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { EventEmitter } from '@angular/core';
import {
  AuthenticationService, ConfigService, IConfig, IProfile,
  LoyaltyService, LoyaltySummaryComponent, ProfileService, StatisticCardComponent
} from '@perxtech/core';
import { MatCardModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { DatePipe } from '@angular/common';

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
    readAppConfig: <T>(): Observable<IConfig<T>> => of()
  };

  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: (): Observable<IProfile> => of(),
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([]),
    getLoyalty: () => of(),
    getTransactions: () => of([])
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
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: AuthenticationService, useValue: authenticationService },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        DatePipe
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
