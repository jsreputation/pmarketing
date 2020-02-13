import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PuzzleComponent } from './puzzle.component';
import {
  CampaignModule,
  VouchersModule,
  PuzzlesModule,
  StampModule,
  ICampaignService,
  StampService,
  IStampCard,
  StampCardState,
  AuthenticationService,
  IVoucherService,
  ThemesService,
  ConfigService
} from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SoundModule } from '../sound/sound.module';
import { of } from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('PuzzleComponent', () => {
  let component: PuzzleComponent;
  let fixture: ComponentFixture<PuzzleComponent>;
  const campaignServiceStub = {
    getCampaigns: () => of([])
  };
  const mockCard: IStampCard = {
    id: 1,
    userAccountId: 1,
    state: StampCardState.active,
    campaignId: 1,
    cardNumber: 1,
    campaignConfig: {
      totalSlots: 1,
      rewards: []
    },
    results: {},
    displayProperties: {
      numberOfCols: 1,
      numberOfRows: 1,
      cardImage: {
        value: {
          imageUrl: 'string'
        }
      },
      totalSlots: 1,
      displayCampaignAs: 'puzzle',
    },
  };
  const stampServiceStub = {
    getStamps: () => of([]),
    getCurrentCard: () => of(mockCard),
    getCards: () => of([mockCard])
  };

  const configServiceStub = {
    readAppConfig: () => of()
  };

  const authenticationServiceStub = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleComponent],
      imports: [
        PuzzlesModule,
        SoundModule,
        RouterTestingModule,
        NoopAnimationsModule,
        VouchersModule,
        CampaignModule,
        StampModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: StampService, useValue: stampServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ConfigService, useValue: configServiceStub},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ campaignId: 1 })
            }
          }
        },
        { provide: IVoucherService, useValue: {} },
        { provide: ThemesService, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
