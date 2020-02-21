import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionComponent } from './redemption.component';
import {
  AuthenticationService,
  ConfigService,
  FeedReaderService,
  IVoucherService,
  ProfileService,
  ThemesService,
  Voucher,
  VouchersModule,
  VoucherState,
  RedemptionType,
} from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture< RedemptionComponent>;
  const mockVoucher: Voucher = {
    id: 2,
    reward: {
      id: 2,
      name: '',
      description: '',
      subtitle: '',
      validFrom: new Date(),
      validTo: new Date(),
      sellingFrom: new Date(),
      rewardThumbnail: '',
      rewardBanner: '',
      merchantImg: '',
      rewardPrice: [],
      merchantId: 1,
      merchantName: '',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      categoryTags: [],
      inventory: null,
    },
    state: VoucherState.issued,
    redemptionType: RedemptionType.none,
    code: 'string;',
    expiry: null,
  };
  const vouchersServiceStub: Partial<IVoucherService> = {
    get: () => of(mockVoucher)
  };
  const themesServiceStub: Partial<ThemesService> = {};
  const feedReaderServiceStub: Partial<FeedReaderService> = {};
  const authenticationServiceStub: Partial<AuthenticationService> = {};
  const profileServiceStub: Partial<ProfileService> = {};
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };
  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get(): number {
          return 1;
        }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedemptionComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        VouchersModule
      ],
      providers: [
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: FeedReaderService, useValue: feedReaderServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide : ConfigService, useValue: configServiceStub},
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
