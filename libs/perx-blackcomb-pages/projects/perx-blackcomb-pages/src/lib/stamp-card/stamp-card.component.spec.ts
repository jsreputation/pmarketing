import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {StampCardComponent} from './stamp-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {IStampCard, NotificationService, PuzzlesModule, StampCardState, StampService} from '@perx/core';
import {TranslateModule} from '@ngx-translate/core';
import {of} from 'rxjs';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {Type} from '@angular/core';
import {stampCard} from './stamp-card.mock';

describe('StampCardComponent', () => {
  let component: StampCardComponent;
  let fixture: ComponentFixture<StampCardComponent>;

  const stampServiceStub: Partial<StampService> = {
    getCurrentCard: () => of(),
    // @ts-ignore
    putStamp: () => of(stampCard.stamps[0])
  };

  const notificationStub = {
    addPopup: () => {}
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

  // todo: update unit test for new logic
  // describe('handleStamp', () => {
  //   it('should call stampServiceSpy and noticationServiceSpy.addPopup with rewardSuccessPopUp data', fakeAsync(() => {
  //     const stampService: StampService = fixture.debugElement.injector.get<StampService>(
  //       StampService as Type<StampService>
  //     );
  //     const stampServiceSpy = spyOn(stampService, 'play').and.returnValue(of(true));
  //
  //     const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>(
  //       NotificationService as Type<NotificationService>
  //     );
  //     const noticationServiceSpy = spyOn(notificationService, 'addPopup');
  //     component.handleStamp();
  //     expect(stampServiceSpy).toHaveBeenCalled();
  //     expect(noticationServiceSpy).toHaveBeenCalledWith({title: 'STAMP_SUCCESS_TITLE', buttonTxt: 'VIEW_REWARD'});
  //   }));
  //
  //   it('should call stampServiceSpy and noticationServiceSpy.addPopup with errorPopUp data', fakeAsync(() => {
  //     const stampService: StampService = fixture.debugElement.injector.get<StampService>(
  //       StampService as Type<StampService>
  //     );
  //     const stampServiceSpy = spyOn(stampService, 'play').and.returnValue(of(false));
  //
  //     const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>(
  //       NotificationService as Type<NotificationService>
  //     );
  //     const noticationServiceSpy = spyOn(notificationService, 'addPopup');
  //     component.handleStamp();
  //     expect(stampServiceSpy).toHaveBeenCalled();
  //     expect(noticationServiceSpy).toHaveBeenCalledWith({title: 'STAMP_ERROR_TITLE', buttonTxt: 'TRY_AGAIN'});
  //   }));
  // });
});
