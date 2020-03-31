import { ComponentFixture, TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { Router, convertToParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ICampaignService, PerxCoreModule, StampService, StampCardState, StampState, NotificationService } from '@perxtech/core';
import { GameComponent } from './game.component';
import { HeaderComponent } from '../header/header.component';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { IStamp } from '@perxtech/core';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(() => {
    const router = {
      navigate: jest.fn()
    };
    const stampServiceStub: Partial<StampService> = {
      getCards: () => (of([
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
      ])),
      stampAll: () => of([{ state: StampState.issued } as IStamp])
    };
    const campaignServiceStub: Partial<ICampaignService> = {
      getCampaigns: () => of()
    };

    const notificationServiceStub: Partial<NotificationService> = { addPopup: () => ({}) };
    TestBed.configureTestingModule({
      declarations: [GameComponent, HeaderComponent],
      imports: [PerxCoreModule],
      providers: [
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ campaignId: 1 })
            }
          }
        },
        { provide: StampService, useValue: stampServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
      ]
    });
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('subTitle defaults to: Unlock your Netflix rebate.', () => {
    expect(component.subTitles).toEqual(['Unlock your Netflix rebate.']);
  });
  it('cards defaults to: []', () => {
    expect(component.cards).toEqual([]);
  });
  it('rows defaults to: 1', () => {
    expect(component.rows).toEqual(1);
  });
  it('keys defaults to: 0', () => {
    expect(component.keys).toEqual(0);
  });

  describe('onStampAll', () => {
    it('should navigate to congrats page if zero redeemed, five stamps available', fakeAsync(() => {
      const selectedCard = {
        id: 362,
        userAccountId: 72,
        state: StampCardState.active,
        campaignId: 1,
        cardNumber: 2,
        campaignConfig: {
          totalSlots: 5,
          rewards: [],
        },
        results: {},
        displayProperties: {
          numberOfCols: 1,
          numberOfRows: 5,
          cardImage: {
            value: {
              imageUrl: ''
            }
          },
          totalSlots: 5,
          displayCampaignAs: 'stamp_card',
        },
        stamps: [
          {
            id: 1608,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1612,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          }
        ],
      };
      component.cards = [
        {
          id: 362,
          userAccountId: 72,
          state: StampCardState.active,
          campaignId: 1,
          cardNumber: 2,
          campaignConfig: {
            totalSlots: 5,
            rewards: [],
          },
          results: {},
          displayProperties: {
            numberOfCols: 1,
            numberOfRows: 5,
            cardImage: {
              value: {
                imageUrl: ''
              }
            },
            totalSlots: 5,
            displayCampaignAs: 'stamp_card',
          },
          stamps: [
            {
              id: 1608,
              userAccountId: 72,
              state: StampState.issued,
              campaignId: 1,
              vouchers: [],
              stampCardId: 1,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: 1609,
              userAccountId: 72,
              state: StampState.issued,
              campaignId: 1,
              vouchers: [],
              stampCardId: 1,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: 1610,
              userAccountId: 72,
              state: StampState.issued,
              campaignId: 1,
              vouchers: [],
              stampCardId: 1,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: 1611,
              userAccountId: 72,
              state: StampState.issued,
              campaignId: 1,
              vouchers: [],
              stampCardId: 1,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: 1612,
              userAccountId: 72,
              state: StampState.issued,
              campaignId: 1,
              vouchers: [],
              stampCardId: 1,
              createdAt: '',
              updatedAt: '',
            },
          ],
        }
      ];

      const stampService: StampService = fixture.debugElement.injector.get<StampService>(
        StampService as Type<StampService>
      );

      const router: Router = fixture.debugElement.injector.get(
        Router
      );

      spyOn(stampService, 'stampAll').and.returnValue(of(
        [{
          id: 1608,
          userAccountId: 72,
          state: StampState.redeemed,
          campaignId: 1,
          vouchers: [],
          stampCardId: 1,
          createdAt: '',
          updatedAt: '',
          results: {}
        },
        {
          id: 1609,
          userAccountId: 72,
          state: StampState.redeemed,
          campaignId: 1,
          vouchers: [],
          stampCardId: 1,
          createdAt: '',
          updatedAt: '',
          results: {}
        },
        {
          id: 1610,
          userAccountId: 72,
          state: StampState.redeemed,
          campaignId: 1,
          vouchers: [],
          stampCardId: 1,
          createdAt: '',
          updatedAt: '',
          results: {}
        },
        {
          id: 1611,
          userAccountId: 72,
          state: StampState.redeemed,
          campaignId: 1,
          vouchers: [],
          stampCardId: 1,
          createdAt: '',
          updatedAt: '',
          results: {}
        },
        {
          id: 1612,
          userAccountId: 72,
          state: StampState.redeemed,
          campaignId: 1,
          vouchers: [],
          stampCardId: 1,
          createdAt: '',
          updatedAt: '',
          results: {}
        }]
      ));

      component.onStampAll(selectedCard);
      tick(3500);
      expect(stampService.stampAll).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['bpi/congrats'], { queryParams: { cid: undefined } });
    }));

    it('should NOT navigate to congrats page if zero redeemed, one stamp available', async(() => {
      const cards = {
        id: 362,
        userAccountId: 72,
        state: StampCardState.active,
        campaignId: 1,
        cardNumber: 2,
        campaignConfig: {
          totalSlots: 5,
          rewards: [],
        },
        results: {},
        displayProperties: {
          numberOfCols: 1,
          numberOfRows: 5,
          cardImage: {
            value: {
              imageUrl: ''
            }
          },
          totalSlots: 5,
          displayCampaignAs: 'stamp_card',
        },
        stamps: [
          {
            id: 1608,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          }
        ],
      };

      component.cards = [
        cards
      ];

      const stampService: StampService = fixture.debugElement.injector.get<StampService>(
        StampService as Type<StampService>
      );

      const router: Router = fixture.debugElement.injector.get(
        Router
      );

      spyOn(stampService, 'stampAll').and.returnValue(of(
        [{
          id: 1608,
          userAccountId: 72,
          state: StampState.redeemed,
          campaignId: 1,
          vouchers: [],
          stampCardId: 1,
          createdAt: '',
          updatedAt: '',
          results: {}
        }]
      ));

      component.onStampAll(cards);
      expect(stampService.stampAll).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalledWith(['bpi/congrats']);
    }));

    it('should NOT navigate to congrats page if one redeemed, three stamps available', async(() => {
      const cards = {
        id: 362,
        userAccountId: 72,
        state: StampCardState.active,
        campaignId: 1,
        cardNumber: 2,
        campaignConfig: {
          totalSlots: 5,
          rewards: [],
        },
        results: {},
        displayProperties: {
          numberOfCols: 1,
          numberOfRows: 5,
          cardImage: {
            value: {
              imageUrl: ''
            }
          },
          totalSlots: 5,
          displayCampaignAs: 'stamp_card',
        },
        stamps: [
          {
            id: 1608,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          }
        ],
      };

      component.cards = [
        cards
      ];

      const stampService: StampService = fixture.debugElement.injector.get<StampService>(
        StampService as Type<StampService>
      );

      const router: Router = fixture.debugElement.injector.get(
        Router
      );

      spyOn(stampService, 'stampAll').and.returnValue(of(
        [
          {
            id: 1608,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1609,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1610,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1611,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          }
        ]
      ));

      component.onStampAll(cards);
      expect(stampService.stampAll).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalledWith(['bpi/congrats']);
    }));

    it('should navigate to congrats page if two redeemed, three stamps available', fakeAsync(() => {
      const cards = {
        id: 362,
        userAccountId: 72,
        state: StampCardState.active,
        campaignId: 1,
        cardNumber: 2,
        campaignConfig: {
          totalSlots: 5,
          rewards: [],
        },
        results: {},
        displayProperties: {
          numberOfCols: 1,
          numberOfRows: 5,
          cardImage: {
            value: {
              imageUrl: ''
            }
          },
          totalSlots: 5,
          displayCampaignAs: 'stamp_card',
        },
        stamps: [
          {
            id: 1608,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1612,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
        ],
      };

      component.cards = [
        cards
      ];

      const stampService: StampService = fixture.debugElement.injector.get<StampService>(
        StampService as Type<StampService>
      );

      const router: Router = fixture.debugElement.injector.get(
        Router
      );

      spyOn(stampService, 'stampAll').and.returnValue(of(
        [
          {
            id: 1608,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1609,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1610,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1611,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1612,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          }
        ]
      ));

      component.onStampAll(cards);
      tick(3500);
      expect(stampService.stampAll).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['bpi/congrats'], { queryParams: { cid: undefined } });
    }));

    it('should NOT navigate to congrats page if two redeemed, two stamps available', async(() => {
      const cards = {
        id: 362,
        userAccountId: 72,
        state: StampCardState.active,
        campaignId: 1,
        cardNumber: 2,
        campaignConfig: {
          totalSlots: 5,
          rewards: [],
        },
        results: {},
        displayProperties: {
          numberOfCols: 1,
          numberOfRows: 5,
          cardImage: {
            value: {
              imageUrl: ''
            }
          },
          totalSlots: 5,
          displayCampaignAs: 'stamp_card',
        },
        stamps: [
          {
            id: 1608,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
        ],
      };

      component.cards = [
        cards
      ];

      const stampService: StampService = fixture.debugElement.injector.get<StampService>(
        StampService as Type<StampService>
      );

      const router: Router = fixture.debugElement.injector.get(
        Router
      );

      spyOn(stampService, 'stampAll').and.returnValue(of(
        [
          {
            id: 1608,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1609,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1610,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1611,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
        ]
      ));

      component.onStampAll(cards);
      expect(stampService.stampAll).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalledWith(['bpi/congrats']);
    }));

    it('should NOT navigate to congrats page if zero redeemed, four stamps available', async(() => {
      const cards = {
        id: 362,
        userAccountId: 72,
        state: StampCardState.active,
        campaignId: 1,
        cardNumber: 2,
        campaignConfig: {
          totalSlots: 5,
          rewards: [],
        },
        results: {},
        displayProperties: {
          numberOfCols: 1,
          numberOfRows: 5,
          cardImage: {
            value: {
              imageUrl: ''
            }
          },
          totalSlots: 5,
          displayCampaignAs: 'stamp_card',
        },
        stamps: [
          {
            id: 1608,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: StampState.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
        ],
      };

      component.cards = [
        cards
      ];

      const stampService: StampService = fixture.debugElement.injector.get<StampService>(
        StampService as Type<StampService>
      );

      const router: Router = fixture.debugElement.injector.get(
        Router
      );

      spyOn(stampService, 'stampAll').and.returnValue(of(
        [
          {
            id: 1608,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1609,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1610,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
          {
            id: 1611,
            userAccountId: 72,
            state: StampState.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
            results: {}
          },
        ]
      ));

      component.onStampAll(cards);
      expect(stampService.stampAll).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalledWith(['bpi/congrats']);
    }));

  });
});
