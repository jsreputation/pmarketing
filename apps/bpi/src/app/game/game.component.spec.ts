import { ComponentFixture, TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { Router, convertToParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CampaignService, PerxCoreModule, StampService, STAMP_CARD_STATE, STAMP_STATE } from '@perx/core/dist/perx-core';
import { NotificationService } from '../notification.service';
import { GameComponent } from './game.component';
import { HeaderComponent } from '../header/header.component';
import { of } from 'rxjs';
import { Type } from '@angular/core';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(() => {
    const router = {
      navigate: jasmine.createSpy('navigate')
    };
    const stampServiceStub = {
      getCards: () => ({ pipe: () => ({ subscribe: () => ({}) }) }),
      stampAll: () => ({ subscribe: () => ({}) })
    };
    const campaignServiceStub = {
      getCampaigns: () => ({ pipe: () => ({ subscribe: () => ({}) }) })
    };

    const notificationServiceStub = { addPopup: () => ({}) };
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
        { provide: CampaignService, useValue: campaignServiceStub },
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
        state: STAMP_CARD_STATE.active,
        campaignId: 1,
        cardNumber: 2,
        campaignConfig: {
          totalSlots: 5,
          rewards: [],
        },
        displayProperties: {
          numberOfCols: 1,
          numberOfRows: 5,
          cardImage: {
            value: {
              imageUrl: ''
            }
          },
          totalSlots: 5,
        },
        stamps: [
          {
            id: 1608,
            userAccountId: 72,
            state: STAMP_STATE.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: STAMP_STATE.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: STAMP_STATE.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: STAMP_STATE.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1612,
            userAccountId: 72,
            state: STAMP_STATE.issued,
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
          state: STAMP_CARD_STATE.active,
          campaignId: 1,
          cardNumber: 2,
          campaignConfig: {
            totalSlots: 5,
            rewards: [],
          },
          displayProperties: {
            numberOfCols: 1,
            numberOfRows: 5,
            cardImage: {
              value: {
                imageUrl: ''
              }
            },
            totalSlots: 5,
          },
          stamps: [
            {
              id: 1608,
              userAccountId: 72,
              state: STAMP_STATE.issued,
              campaignId: 1,
              vouchers: [],
              stampCardId: 1,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: 1609,
              userAccountId: 72,
              state: STAMP_STATE.issued,
              campaignId: 1,
              vouchers: [],
              stampCardId: 1,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: 1610,
              userAccountId: 72,
              state: STAMP_STATE.issued,
              campaignId: 1,
              vouchers: [],
              stampCardId: 1,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: 1611,
              userAccountId: 72,
              state: STAMP_STATE.issued,
              campaignId: 1,
              vouchers: [],
              stampCardId: 1,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: 1612,
              userAccountId: 72,
              state: STAMP_STATE.issued,
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
          state: STAMP_STATE.redeemed,
          campaignId: 1,
          vouchers: [],
          stampCardId: 1,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: 1609,
          userAccountId: 72,
          state: STAMP_STATE.redeemed,
          campaignId: 1,
          vouchers: [],
          stampCardId: 1,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: 1610,
          userAccountId: 72,
          state: STAMP_STATE.redeemed,
          campaignId: 1,
          vouchers: [],
          stampCardId: 1,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: 1611,
          userAccountId: 72,
          state: STAMP_STATE.redeemed,
          campaignId: 1,
          vouchers: [],
          stampCardId: 1,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: 1612,
          userAccountId: 72,
          state: STAMP_STATE.redeemed,
          campaignId: 1,
          vouchers: [],
          stampCardId: 1,
          createdAt: '',
          updatedAt: '',
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
        state: STAMP_CARD_STATE.active,
        campaignId: 1,
        cardNumber: 2,
        campaignConfig: {
          totalSlots: 5,
          rewards: [],
        },
        displayProperties: {
          numberOfCols: 1,
          numberOfRows: 5,
          cardImage: {
            value: {
              imageUrl: ''
            }
          },
          totalSlots: 5,
        },
        stamps: [
          {
            id: 1608,
            userAccountId: 72,
            state: STAMP_STATE.issued,
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
          state: STAMP_STATE.redeemed,
          campaignId: 1,
          vouchers: [],
          stampCardId: 1,
          createdAt: '',
          updatedAt: '',
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
        state: STAMP_CARD_STATE.active,
        campaignId: 1,
        cardNumber: 2,
        campaignConfig: {
          totalSlots: 5,
          rewards: [],
        },
        displayProperties: {
          numberOfCols: 1,
          numberOfRows: 5,
          cardImage: {
            value: {
              imageUrl: ''
            }
          },
          totalSlots: 5,
        },
        stamps: [
          {
            id: 1608,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: STAMP_STATE.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: STAMP_STATE.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: STAMP_STATE.issued,
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
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
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
        state: STAMP_CARD_STATE.active,
        campaignId: 1,
        cardNumber: 2,
        campaignConfig: {
          totalSlots: 5,
          rewards: [],
        },
        displayProperties: {
          numberOfCols: 1,
          numberOfRows: 5,
          cardImage: {
            value: {
              imageUrl: ''
            }
          },
          totalSlots: 5,
        },
        stamps: [
          {
            id: 1608,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: STAMP_STATE.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: STAMP_STATE.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1612,
            userAccountId: 72,
            state: STAMP_STATE.issued,
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
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1612,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
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
        state: STAMP_CARD_STATE.active,
        campaignId: 1,
        cardNumber: 2,
        campaignConfig: {
          totalSlots: 5,
          rewards: [],
        },
        displayProperties: {
          numberOfCols: 1,
          numberOfRows: 5,
          cardImage: {
            value: {
              imageUrl: ''
            }
          },
          totalSlots: 5,
        },
        stamps: [
          {
            id: 1608,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: STAMP_STATE.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: STAMP_STATE.issued,
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
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
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
        state: STAMP_CARD_STATE.active,
        campaignId: 1,
        cardNumber: 2,
        campaignConfig: {
          totalSlots: 5,
          rewards: [],
        },
        displayProperties: {
          numberOfCols: 1,
          numberOfRows: 5,
          cardImage: {
            value: {
              imageUrl: ''
            }
          },
          totalSlots: 5,
        },
        stamps: [
          {
            id: 1608,
            userAccountId: 72,
            state: STAMP_STATE.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: STAMP_STATE.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: STAMP_STATE.issued,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: STAMP_STATE.issued,
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
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1609,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1610,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
          {
            id: 1611,
            userAccountId: 72,
            state: STAMP_STATE.redeemed,
            campaignId: 1,
            vouchers: [],
            stampCardId: 1,
            createdAt: '',
            updatedAt: '',
          },
        ]
      ));

      component.onStampAll(cards);
      expect(stampService.stampAll).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalledWith(['bpi/congrats']);
    }));

  });
});
