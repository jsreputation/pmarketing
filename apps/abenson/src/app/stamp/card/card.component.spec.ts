import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PuzzlesModule, StampCardState, StampService } from '@perx/core';
import { of } from 'rxjs';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const stampServiceStub: Partial<StampService> = {
    getCurrentCard: () => of(
      {
        id: 1,
        state: StampCardState.active,
        title: 'Test',
        campaignConfig: null,
        results: {},
        displayProperties: {
          numberOfCols: undefined,
          numberOfRows: undefined,
          cardImage: undefined,
          preStampImg: undefined,
          postStampImg: undefined,
          rewardPreStamp: undefined,
          rewardPostStamp: undefined,
          bgImage: undefined,
          cardBgImage: undefined,
          totalSlots: undefined,
          displayCampaignAs: '',
          backgroundImg: undefined,
          rewardPositions: undefined,
          thumbnailImg: undefined,
          noRewardsPopUp: {
            headLine: 'Headline',
            subHeadLine: 'Sub headline',
            imageURL: 'url',
            buttonTxt: 'button'
          },
          successPopUp: {
            headLine: 'Headline',
            subHeadLine: 'Sub headline',
            imageURL: 'url',
            buttonTxt: 'button'
          }
        }
      }
    )
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [RouterTestingModule, PuzzlesModule],
      providers: [
        { provide: StampService, useValue: stampServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
