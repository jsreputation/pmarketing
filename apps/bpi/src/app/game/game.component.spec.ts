import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Router, convertToParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CampaignService, PerxCoreModule, StampService, STAMP_CARD_STATE, STAMP_STATE } from '@perx/core/dist/perx-core';
import { NotificationService } from '../notification.service';
import { GameComponent } from './game.component';
import { HeaderComponent } from '../header/header.component';
import { of } from 'rxjs';

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
        {provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({campaignId: 1})
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
    expect(component.subTitle).toEqual('Unlock your Netflix rebate.');
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
    it('should navigate to congrats page if zero redeemed, five stamps available', async(() => {
      const selectedCard = {
        id: 362,
        user_account_id: 72,
        state: STAMP_CARD_STATE.active,
        campaign_id: 1,
        card_number: 2,
        campaign_config: {
          total_slots: 5,
          rewards: [],
        },
        display_properties: {
          number_of_cols: 1,
          number_of_rows: 5,
          card_image: {
            value: {
              image_url: ''
            }
          },
          total_slots: 5,
        },
        stamps: [
          {
            id: 1608,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1609,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1610,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1611,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1612,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          }
        ],
      };
      component.cards = [
        {
        id: 362,
        user_account_id: 72,
        state: STAMP_CARD_STATE.active,
        campaign_id: 1,
        card_number: 2,
        campaign_config: {
          total_slots: 5,
          rewards: [],
        },
        display_properties: {
          number_of_cols: 1,
          number_of_rows: 5,
          card_image: {
            value: {
              image_url: ''
            }
          },
          total_slots: 5,
        },
        stamps: [
          {
            id: 1608,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1609,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1610,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1611,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1612,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
        ],
        }
      ];

      const stampService: StampService = fixture.debugElement.injector.get(
        StampService
      );

      const router: Router = fixture.debugElement.injector.get(
        Router
      );

      spyOn(stampService, 'stampAll').and.returnValue(of(
        [{
          id: 1608,
          user_account_id: 72,
          state: STAMP_STATE.redeemed,
          campaign_id: 1,
          vouchers: [],
          stamp_card_id: 1,
          created_at: '',
          updated_at: '',
        },
        {
          id: 1609,
          user_account_id: 72,
          state: STAMP_STATE.redeemed,
          campaign_id: 1,
          vouchers: [],
          stamp_card_id: 1,
          created_at: '',
          updated_at: '',
        },
        {
          id: 1610,
          user_account_id: 72,
          state: STAMP_STATE.redeemed,
          campaign_id: 1,
          vouchers: [],
          stamp_card_id: 1,
          created_at: '',
          updated_at: '',
        },
        {
          id: 1611,
          user_account_id: 72,
          state: STAMP_STATE.redeemed,
          campaign_id: 1,
          vouchers: [],
          stamp_card_id: 1,
          created_at: '',
          updated_at: '',
        },
        {
          id: 1612,
          user_account_id: 72,
          state: STAMP_STATE.redeemed,
          campaign_id: 1,
          vouchers: [],
          stamp_card_id: 1,
          created_at: '',
          updated_at: '',
        }]
      ));

      component.onStampAll(selectedCard);
      expect(stampService.stampAll).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['bpi/congrats']);
    }));

    it('should NOT navigate to congrats page if zero redeemed, one stamp available', async(() => {
      const cards = {
        id: 362,
        user_account_id: 72,
        state: STAMP_CARD_STATE.active,
        campaign_id: 1,
        card_number: 2,
        campaign_config: {
          total_slots: 5,
          rewards: [],
        },
        display_properties: {
          number_of_cols: 1,
          number_of_rows: 5,
          card_image: {
            value: {
              image_url: ''
            }
          },
          total_slots: 5,
        },
        stamps: [
          {
            id: 1608,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          }
        ],
      };

      component.cards = [
        cards
      ];

      const stampService: StampService = fixture.debugElement.injector.get(
        StampService
      );

      const router: Router = fixture.debugElement.injector.get(
        Router
      );

      spyOn(stampService, 'stampAll').and.returnValue(of(
        [{
          id: 1608,
          user_account_id: 72,
          state: STAMP_STATE.redeemed,
          campaign_id: 1,
          vouchers: [],
          stamp_card_id: 1,
          created_at: '',
          updated_at: '',
        }]
      ));

      component.onStampAll(cards);
      expect(stampService.stampAll).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalledWith(['bpi/congrats']);
    }));

    it('should NOT navigate to congrats page if one redeemed, three stamps available', async(() => {
      const cards = {
        id: 362,
        user_account_id: 72,
        state: STAMP_CARD_STATE.active,
        campaign_id: 1,
        card_number: 2,
        campaign_config: {
          total_slots: 5,
          rewards: [],
        },
        display_properties: {
          number_of_cols: 1,
          number_of_rows: 5,
          card_image: {
            value: {
              image_url: ''
            }
          },
          total_slots: 5,
        },
        stamps: [
          {
            id: 1608,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1609,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1610,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1611,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          }
        ],
      };

      component.cards = [
        cards
      ];

      const stampService: StampService = fixture.debugElement.injector.get(
        StampService
      );

      const router: Router = fixture.debugElement.injector.get(
        Router
      );

      spyOn(stampService, 'stampAll').and.returnValue(of(
        [
          {
            id: 1608,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1609,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1610,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1611,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          }
        ]
      ));

      component.onStampAll(cards);
      expect(stampService.stampAll).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalledWith(['bpi/congrats']);
    }));

    it('should navigate to congrats page if two redeemed, three stamps available', async(() => {
      const cards = {
        id: 362,
        user_account_id: 72,
        state: STAMP_CARD_STATE.active,
        campaign_id: 1,
        card_number: 2,
        campaign_config: {
          total_slots: 5,
          rewards: [],
        },
        display_properties: {
          number_of_cols: 1,
          number_of_rows: 5,
          card_image: {
            value: {
              image_url: ''
            }
          },
          total_slots: 5,
        },
        stamps: [
          {
            id: 1608,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1609,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1610,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1611,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1612,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
        ],
      };

      component.cards = [
        cards
      ];

      const stampService: StampService = fixture.debugElement.injector.get(
        StampService
      );

      const router: Router = fixture.debugElement.injector.get(
        Router
      );

      spyOn(stampService, 'stampAll').and.returnValue(of(
        [
          {
            id: 1608,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1609,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1610,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1611,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1612,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          }
        ]
      ));

      component.onStampAll(cards);
      expect(stampService.stampAll).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['bpi/congrats']);
    }));

    it('should NOT navigate to congrats page if two redeemed, two stamps available', async(() => {
      const cards = {
        id: 362,
        user_account_id: 72,
        state: STAMP_CARD_STATE.active,
        campaign_id: 1,
        card_number: 2,
        campaign_config: {
          total_slots: 5,
          rewards: [],
        },
        display_properties: {
          number_of_cols: 1,
          number_of_rows: 5,
          card_image: {
            value: {
              image_url: ''
            }
          },
          total_slots: 5,
        },
        stamps: [
          {
            id: 1608,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1609,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1610,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1611,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
        ],
      };

      component.cards = [
        cards
      ];

      const stampService: StampService = fixture.debugElement.injector.get(
        StampService
      );

      const router: Router = fixture.debugElement.injector.get(
        Router
      );

      spyOn(stampService, 'stampAll').and.returnValue(of(
        [
          {
            id: 1608,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1609,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1610,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1611,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
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
        user_account_id: 72,
        state: STAMP_CARD_STATE.active,
        campaign_id: 1,
        card_number: 2,
        campaign_config: {
          total_slots: 5,
          rewards: [],
        },
        display_properties: {
          number_of_cols: 1,
          number_of_rows: 5,
          card_image: {
            value: {
              image_url: ''
            }
          },
          total_slots: 5,
        },
        stamps: [
          {
            id: 1608,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1609,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1610,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1611,
            user_account_id: 72,
            state: STAMP_STATE.issued,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
        ],
      };

      component.cards = [
        cards
      ];

      const stampService: StampService = fixture.debugElement.injector.get(
        StampService
      );

      const router: Router = fixture.debugElement.injector.get(
        Router
      );

      spyOn(stampService, 'stampAll').and.returnValue(of(
        [
          {
            id: 1608,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1609,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1610,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
          {
            id: 1611,
            user_account_id: 72,
            state: STAMP_STATE.redeemed,
            campaign_id: 1,
            vouchers: [],
            stamp_card_id: 1,
            created_at: '',
            updated_at: '',
          },
        ]
      ));

      component.onStampAll(cards);
      expect(stampService.stampAll).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalledWith(['bpi/congrats']);
    }));

  });
});
