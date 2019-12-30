import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { WhistlerGameService } from './whist-game.service';
import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { ConfigModule } from '../config/config.module';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { Type } from '@angular/core';
import { IGame, GameType } from './game.model';

import {
  WGameType,
  IJsonApiItem,
  IJsonApiItemPayload,
  IWGameEngagementAttributes,
} from '@perx/whistler';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { WhistlerVouchersService } from '../vouchers/whistler-vouchers.service';
import { RewardsService } from '../rewards/rewards.service';

describe('WhistlerGameService', () => {
  let httpTestingController: HttpTestingController;
  let service: WhistlerGameService;
  const vouchersServiceMock = jasmine.createSpyObj('IVoucherService', {
    get: of({}),
    getFullVoucher: of({})
  });

  const environment = {
    apiHost: 'https://blabla',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };
  const rewardsServiceStub: Partial<RewardsService> = {};
  const mockTree: IJsonApiItem<IWGameEngagementAttributes> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      urn: '',
      created_at: '',
      updated_at: '',
      game_type: WGameType.shakeTheTree,
      title: '',
      description: '',
      image_url: '',
      properties: {},
      display_properties: {
        title: '',
        button: '',
        sub_title: ''
      }
    }
  };

  const mockTap: IJsonApiItem<IWGameEngagementAttributes> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      urn: '',
      created_at: '',
      updated_at: '',
      game_type: WGameType.pinata,
      title: '',
      description: '',
      image_url: '',
      properties: {},
      display_properties: {
        title: '',
        button: '',
        sub_title: ''
      }
    }
  };

  const mockScratch: IJsonApiItem<IWGameEngagementAttributes> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      urn: '',
      created_at: '',
      updated_at: '',
      game_type: WGameType.scratch,
      title: '',
      description: '',
      image_url: '',
      properties: {},
      display_properties: {
        title: '',
        button: '',
        sub_title: ''
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ConfigModule.forRoot({ ...environment })],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceMock },
        { provide: RewardsService, useValue: rewardsServiceStub }
      ]
    });
    // httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(WhistlerGameService);
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  it('should get a tree from its id', (done: DoneFn) => {
    service.get(42, 1)
      .subscribe(
        (g: IGame) => {
          expect(`${g.id}`).toEqual(mockTree.id);
          expect(g.type).toEqual(GameType.shakeTheTree);
          done();
        },
        fail
      );

    const req = httpTestingController.expectOne('https://blabla/game/engagements/42?campaign_id=1');
    expect(req.request.method).toEqual('GET');
    const res: IJsonApiItemPayload<IWGameEngagementAttributes> = {
      data: mockTree
    };
    req.flush(res);

    httpTestingController.verify();
  });

  it('should get a pinata from its id', (done: DoneFn) => {
    service.get(42, 1)
      .subscribe(
        (g: IGame) => {
          expect(`${g.id}`).toEqual(mockTree.id);
          expect(g.type).toEqual(GameType.pinata);
          done();
        },
        fail
      );

    const req = httpTestingController.expectOne('https://blabla/game/engagements/42?campaign_id=1');
    expect(req.request.method).toEqual('GET');
    const res: IJsonApiItemPayload<IWGameEngagementAttributes> = {
      data: mockTap
    };
    req.flush(res);

    httpTestingController.verify();
  });

  it('should get a scratch card from its id', (done: DoneFn) => {
    service.get(42, 1)
      .subscribe(
        (g: IGame) => {
          expect(`${g.id}`).toEqual(mockTree.id);
          expect(g.type).toEqual(GameType.scratch);
          done();
        },
        fail
      );

    const req = httpTestingController.expectOne('https://blabla/game/engagements/42?campaign_id=1');
    expect(req.request.method).toEqual('GET');
    const res: IJsonApiItemPayload<IWGameEngagementAttributes> = {
      data: mockScratch
    };
    req.flush(res);

    httpTestingController.verify();
  });

  it('WGameToGame else branches', fakeAsync(inject([WhistlerGameService, HttpClient],
    (gameService: WhistlerGameService, http: HttpClient) => {
      const spyHttp = spyOn(http, 'get').and.returnValue(of({
        data: {
          attributes: {
            game_type: 'shake_the_tree',
            display_properties: {
              title: 'test',
              button: 'test',
              sub_title: 'test',
              background_img_url: 'https://img.img'
            },
            image_url: 'https://img.jpeg'
          }
        }
      }));
      gameService.get(500).subscribe(() => { });
      // clear spy from last calls
      tick();
      expect(spyHttp).toHaveBeenCalled();
      spyHttp.calls.reset();
      // should get elemem from cashe
      gameService.get(500).subscribe(() => { });
      tick();
      expect(spyHttp).not.toHaveBeenCalled();
    })));

  it('', fakeAsync(inject([WhistlerGameService, HttpClient],
    (gameService: WhistlerGameService, http: HttpClient) => {
      spyOn(http, 'post').and.returnValue(of({
        data: {
          attributes: {
            results: {
              attributes: {
                results: [{ id: '1' }]
              }
            }
          }
        }
      }));
      gameService.play(500, 500).subscribe(() => { });
      tick();
      expect(vouchersServiceMock.getFullVoucher).toHaveBeenCalled();
    })));

  it('getGamesFromCampaign', fakeAsync(inject([WhistlerGameService, HttpClient],
    (gameService: WhistlerGameService, http: HttpClient) => {
      const httpSpy = spyOn(http, 'get').and.returnValue(of({
        data: {
          attributes: {
            display_properties: {
              engagement_id: 1
            }
          }
        }
      }));
      gameService.getGamesFromCampaign(1).subscribe(() => { });
      tick();
      expect(httpSpy).toHaveBeenCalled();
    })));

  it('WGameToGame convert spin', fakeAsync(inject([WhistlerGameService, HttpClient],
    (gameService: WhistlerGameService, http: HttpClient) => {
      spyOn(http, 'get').and.returnValue(of({
        data: {
          attributes: {
            game_type: WGameType.spin,
            display_properties: {
              wedge_colors: {}
            }
          }
        } as IJsonApiItem<IWGameEngagementAttributes>
      }));
      gameService.get(1).subscribe((val) => {
        expect(val.type).toBe(GameType.spin);
      });
      tick();
    })));

  it('play full workflow', fakeAsync(inject([WhistlerGameService, HttpClient, WhistlerVouchersService],
    (gameService: WhistlerGameService, http: HttpClient, voucherService: WhistlerVouchersService) => {
      spyOn(http, 'post').and.returnValue(of({
        data: {
          attributes: {
            results: {
              attributes: { results: [{ id: 1 }] }
            }
          }
        }
      }));
      spyOn(voucherService, 'getFullVoucher').and.returnValue(of());
      gameService.play(1, 1).subscribe((val) => expect(val.vouchers.length).toBe(1));
      tick();
    })));

  it('prePlay', fakeAsync(inject([WhistlerGameService, HttpClient],
    (gameService: WhistlerGameService, http: HttpClient) => {
      spyOn(http, 'post').and.returnValue(of({
        data: {
          id: 1,
          attributes: {
            results: {
              attributes: {
                results: [{ id: 1 }]
              }
            }
          }
        }
      }));
      gameService.prePlay(1).subscribe((val) => expect(val.id).toBe(1));
      tick();
    })));

  it('should handle prePlayConfirm', fakeAsync(inject([WhistlerGameService, HttpClient],
    (gameService: WhistlerGameService, http: HttpClient) => {
      spyOn(http, 'patch').and.returnValue(of({}));
      gameService.prePlayConfirm(1).subscribe((val) => expect(val).toBeFalsy());
      tick();
    })));
});
