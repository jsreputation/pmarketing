import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StampCardComponent } from './stamp-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PuzzlesModule, StampCardState, StampService, NotificationService, IStampCard, ConfigService } from '@perxtech/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Type } from '@angular/core';

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

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of({
      apiHost: '',
      production: false,
      preAuth: false,
      isWhistler: false,
      baseHref: ''
    })
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StampCardComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        PuzzlesModule,
      ],
      providers: [
        { provide: StampService, useValue: stampServiceStub },
        { provide: ActivatedRoute, useValue: { queryParams: of({ id: '1' }) } },
        { provide: ConfigService, useValue: configServiceStub },
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
});
