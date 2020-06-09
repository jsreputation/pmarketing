import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StampCardComponent } from './stamp-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PuzzlesModule, StampCardState, StampService } from '@perxtech/core';
import { of } from 'rxjs';

describe('StampCardComponent', () => {
  let component: StampCardComponent;
  let fixture: ComponentFixture<StampCardComponent>;

  const stampServiceStub: Partial<StampService> = {
    getCurrentCard: () => of(),
    // @ts-ignore
    putStamp: () => of(stampCard.stamps[0])
  };

  const notificationStub: Partial<NotificationService> = {
    addPopup: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StampCardComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        PuzzlesModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: StampService, useValue: stampServiceStub },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '1' })) } },
        { provide: NotificationService, useValue: notificationStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should stampService getCurrent card and set private errorPopUp and successPopUp IPopupConfig', fakeAsync(() => {
      const stampCard: IStampCard = {
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
      };
      const stampService: StampService = fixture.debugElement.injector.get<StampService>(
        StampService as Type<StampService>
      );
      const stampServiceSpy = spyOn(stampService, 'getCurrentCard').and.returnValue(of(stampCard));
      component.ngOnInit();
      tick();
      expect(stampServiceSpy).toHaveBeenCalled();
    }));

    it('should stampService getCurrent card and private errorPopUp and successPopUp IPopupConfig should be default value', fakeAsync(() => {
      const stampCard: IStampCard = {
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
          noRewardsPopUp: undefined,
          successPopUp: undefined
        }
      };
      const stampService: StampService = fixture.debugElement.injector.get<StampService>(
        StampService as Type<StampService>
      );
      const stampServiceSpy = spyOn(stampService, 'getCurrentCard').and.returnValue(of(stampCard));
      component.ngOnInit();
      tick();
      expect(stampServiceSpy).toHaveBeenCalled();
    }));
  });

  describe('handleStamp', () => {
    it('should throw error if card is empty ', async () => {
      component.stampCard = null;
      let errorMessage = 'No error thrown';
      try {
        await component.handleStamp(stamps[0]);
      } catch (error) {
        errorMessage = error.message;
      }
      expect(errorMessage).toBe('card or stamps is required');
    });
  });
});
