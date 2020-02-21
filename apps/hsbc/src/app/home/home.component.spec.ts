import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {
  AuthenticationService,
  CampaignState,
  CampaignType,
  ConfigService,
  FeedReaderService,
  ICampaignService,
  IVoucherService,
  ProfileService,
  PuzzlesModule,
  StampService,
  StampState,
  ThemesService,
  VouchersModule,
  StampCardState
} from '@perx/core';
import {RouterTestingModule} from '@angular/router/testing';
import {MatCardModule, MatIconModule, MatRippleModule, MatTabsModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {NavigateToolbarComponent} from '../navigate-toolbar/navigate-toolbar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {PuzzleListComponent} from '../mock/service/puzzle-list/puzzle-list.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([
      {
        id: 100,
        name: 'Puzzle Game',
        description: 'jahdjkashdjsahdkajhda',
        type: CampaignType.stamp,
        endsAt: new Date(),
        state: CampaignState.active
      }
    ])
  };
  const vouchersServiceStub: Partial<IVoucherService> = {
    getAll: () => of([])
  };

  const stampSeviceStub: Partial<StampService> = {
    getCards: () => of(),
    getCurrentCard: () => of({
      id: 4768,
      userAccountId: 59431,
      state: StampCardState.active,
      campaignId: 100,
      cardNumber: 161,
      campaignConfig: null,
      displayProperties: {
        numberOfCols: 3,
        numberOfRows: 2,
        cardImage: {
          value: {
            imageUrl: 'https://perx-cdn-staging.s3.amazonaws.com/model_image/source/34/puzzle1-4cd0eb3e-57cf-4aab-930d-f38dbcc8671b.png'
          }
        },
        totalSlots: 6,
        displayCampaignAs: 'puzzle',
        backgroundImg: {
          value: {
            imageUrl: null
          }
        }
      },
      stamps: [
        {
          id: 28369,
          userAccountId: 59431,
          state: StampState.redeemed,
          stampCardId: 1,
          createdAt: 'string',
          updatedAt: 'string',
          campaignId: 100,
          vouchers: []
        },
        {
          id: 28370,
          userAccountId: 59431,
          state: StampState.redeemed,
          stampCardId: 1,
          createdAt: 'string',
          updatedAt: 'string',
          campaignId: 100,
          vouchers: []
        },
        {
          id: 28372,
          userAccountId: 59431,
          state: StampState.issued,
          stampCardId: 1,
          createdAt: 'string',
          updatedAt: 'string',
          campaignId: 100,
          vouchers: []
        },
        {
          id: 28373,
          userAccountId: 59431,
          state: StampState.issued,
          stampCardId: 1,
          createdAt: 'string',
          updatedAt: 'string',
          campaignId: 100,
          vouchers: []
        },
        {
          id: 28374,
          userAccountId: 59431,
          state: StampState.issued,
          stampCardId: 1,
          createdAt: 'string',
          updatedAt: 'string',
          campaignId: 100,
          vouchers: []
        },
        {
          id: 28375,
          userAccountId: 59431,
          state: StampState.issued,
          stampCardId: 1,
          createdAt: 'string',
          updatedAt: 'string',
          campaignId: 100,
          vouchers: []
        }
      ]
    })
  };

  const themesServiceStub: Partial<ThemesService> = {};

  const feedReaderServiceStub: Partial<FeedReaderService> = {};

  const authenticationServiceStub: Partial<AuthenticationService> = {};

  const profileServiceStub: Partial<ProfileService> = {};

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        NavigateToolbarComponent,

        PuzzleListComponent
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        MatTabsModule,
        MatIconModule,
        MatCardModule,
        VouchersModule,
        PuzzlesModule,

        MatRippleModule
      ],
      providers: [
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: StampService, useValue: stampSeviceStub },
        { provide: FeedReaderService, useValue: feedReaderServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
      ],
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
