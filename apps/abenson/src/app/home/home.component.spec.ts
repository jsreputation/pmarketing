import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import {
  IVoucherService,
  VouchersModule,
  ICampaignService,
  LoyaltyModule,
  ProfileModule,
  ProfileService,
  LoyaltyService,
  IProfile,
  ConfigService,
  IConfig
} from '@perx/core';
import { of, Observable } from 'rxjs';
import { MatCardModule } from '@angular/material';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: <T>(): Observable<IConfig<T>> => of()
  };
  const vouchersServiceStub: Partial<IVoucherService> = {
    getAll: () => of()
  };

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of()
  };

  const mockProfile: IProfile = {
    id: 1,
    state: '',
    firstName: '',
    lastName: '',
  };
  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of(mockProfile)
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalty: () => of(),
    getLoyalties: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        VouchersModule,
        LoyaltyModule,
        ProfileModule,
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
