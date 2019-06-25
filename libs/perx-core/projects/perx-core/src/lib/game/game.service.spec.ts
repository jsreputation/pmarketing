import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { EnvConfig } from './env-config';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { IGame, GAME_TYPE } from './game.model';

describe('GameService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EnvConfig
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
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
      .subscribe((data) => {
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
        expect(games.length).toBe(1);
        const game = games[0];
        expect(game.id).toBe(4);
        expect(game.campaignId).toBe(1);
        expect(game.type).toBe(GAME_TYPE.shakeTheTree);
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
        }
      ]
    });

    httpTestingController.verify();
  });
});
