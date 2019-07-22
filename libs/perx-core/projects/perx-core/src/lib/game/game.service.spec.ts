import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { EnvConfig } from '../shared/env-config';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IGame, GAME_TYPE } from './game.model';
import { Type } from '@angular/core';

describe('GameService', () => {
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EnvConfig
      ]
    });

    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });

  it('should play one game', (done: DoneFn) => {
    const service: GameService = TestBed.get(GameService);
    service.play(1)
      .subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/games/1/play');

    expect(req.request.method).toEqual('PUT');

    req.flush(null);

    httpTestingController.verify();
  });

  it('should get games from campaign Id', (done: DoneFn) => {
    const service: GameService = TestBed.get(GameService);
    service.getGamesFromCampaign(1)
      .subscribe((games: IGame[]) => {
        expect(games.length).toBe(0);
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/campaigns/1/games');

    expect(req.request.method).toEqual('GET');

    req.flush({ data: [] });

    httpTestingController.verify();
  });

  it('should get many games from campaign Id', (done: DoneFn) => {
    const service: GameService = TestBed.get(GameService);
    service.getGamesFromCampaign(1)
      .subscribe((games: IGame[]) => {
        expect(games.length).toBe(2);
        const tree = games[0];
        expect(tree.id).toBe(4);
        expect(tree.campaignId).toBe(1);
        expect(tree.type).toBe(GAME_TYPE.shakeTheTree);
        const pinata = games[1];
        expect(pinata.id).toBe(5);
        expect(pinata.campaignId).toBe(1);
        expect(pinata.type).toBe(GAME_TYPE.pinata);
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/campaigns/1/games');

    expect(req.request.method).toEqual('GET');

    req.flush({
      data: [
        {
          campaign_id: 1,
          display_properties: {
            number_of_gifts_to_drop: 3,
            gift_image: {
              value: {
                image_url: ''
              }
            },
            tree_image: {
              value: {
                image_url: ''
              }
            },
            waiting_image: {
              value: {
                image_url: ''
              }
            },
            celebrating_image: {
              value: {
                image_url: ''
              }
            }
          },
          game_type: 'shake_the_tree',
          id: 4,
          number_of_tries: 23,
          state: null,
          user_account_id: 42
        },
        {
          id: 5,
          campaign_id: 1,
          game_type: 'hit_the_pinata',
          display_properties: {
            still_image: {
              value: {
                image_url: ''
              }
            },
            opened_image: {
              value: {
                image_url: ''
              }
            }
          }
        }
      ]
    });

    httpTestingController.verify();
  });

  it('should get a shake the tree game from its id', (done: DoneFn) => {
    const service: GameService = TestBed.get(GameService);
    service.get(42)
      .subscribe((game: IGame) => {
        expect(game.id).toBe(42);
        // expect
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/games/42');
    expect(req.request.method).toEqual('GET');

    req.flush({
      data: {
        id: 42,
        game_type: 'shake_the_tree',
        display_properties: {
          tree_image: {
            value: {
              image_url: 'https://42.com'
            },
          },
          gift_image: {
            value: {
              image_url: 'https://42.com'
            }
          },
          waiting_image: {
            value: {
              image_url: ''
            }
          },
          celebrating_image: {
            value: {
              image_url: ''
            }
          },
          number_of_gifts_shown: 42,
          number_of_gifts_to_drop: 42
        }
      }
    });

    httpTestingController.verify();
  });

  it('should get a pinata game from its id', (done: DoneFn) => {
    const service: GameService = TestBed.get(GameService);
    service.get(42)
      .subscribe((game: IGame) => {
        expect(game.id).toBe(42);
        // expect
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/games/42');
    expect(req.request.method).toEqual('GET');

    req.flush({
      data: {
        id: 42,
        game_type: 'hit_the_pinata',
        display_properties: {
          still_image: {
            value: {
              image_url: 'https://42.com'
            },
          },
          opened_image: {
            value: {
              image_url: 'https://42.com'
            }
          }
        }
      }
    });

    httpTestingController.verify();
  });
});
