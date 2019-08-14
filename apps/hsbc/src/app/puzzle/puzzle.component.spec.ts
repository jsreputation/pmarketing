import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PuzzleComponent } from './puzzle.component';
import {
  CampaignModule,
  VouchersModule,
  PuzzlesModule,
  StampModule,
  CampaignService,
  StampService,
  IStampCard,
  StampCardState
} from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SoundModule } from '../sound/sound.module';
import { of } from 'rxjs';

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
    displayProperties: {
      numberOfCols: 1,
      numberOfRows: 1,
      cardImage: {
        value: {
          imageUrl: 'string'
        }
      },
      totalSlots: 1,
    },
  };
  const stampServiceStub = {
    getStamps: () => of([]),
    getCurrentCard: () => of(mockCard),
    getCards: () => of([mockCard])
  };

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
      ],
      providers: [
        { provide: CampaignService, useValue: campaignServiceStub },
        { provide: StampService, useValue: stampServiceStub }
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
