import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDetailsComponent } from './reward-details.component';
import { RewardsModule, RewardsService, VouchersModule, ConfigService, IVoucherService, LoyaltyService, ILoyalty, ThemesService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RewardComponent', () => {
  let component: RewardDetailsComponent;
  let fixture: ComponentFixture<RewardDetailsComponent>;
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of({
      apiHost: '',
      production: false,
      preAuth: false,
      isWhistler: false,
      baseHref: '',
    })
  };
  const vouchersServiceStub: Partial<IVoucherService>  = {
    issueReward: () => of()
  };

  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of()
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: (): Observable<ILoyalty[]> => of([]),
    getLoyalty: (): Observable<ILoyalty> => of()
  };

  const themeServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardDetailsComponent],
      imports: [
        MatDialogModule,
        RewardsModule,
        VouchersModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ThemesService, useValue: themeServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
