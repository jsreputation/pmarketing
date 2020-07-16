import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, of, combineLatest, throwError, EMPTY, Subject} from 'rxjs';
import { IGameService } from './igame.service';
import {
  IGame,
  GameType as TYPE,
  IPlayOutcome,
  IEngagementTransaction,
  Error400States,
} from './game.model';
import {
  catchError,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { IV4Voucher, V4VouchersService } from '../vouchers/v4-vouchers.service';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { Cacheable } from 'ngx-cacheable';
import {
  ScratchV4ToV4Mapper,
  ShakeV4ToV4Mapper,
  SpinV4ToV4Mapper,
  TapV4ToV4Mapper
} from './v4-game.mapper';

const enum GameType {
  shakeTheTree = 'shake_the_tree',
  pinata = 'hit_the_pinata',
  scratch = 'scratch_card',
  spin = 'spin_the_wheel',
  quiz = 'quiz'
}

export interface Asset {
  type: string;
  value: {
    file: string;
    filename: string;
    image_id: number;
    image_url: string;
  };
}

export interface Outcome {
  button_text: string;
  description: string;
  title: string;
  type?: string;
  value?: {
    file: string;
    filename: string;
    image_id: number;
    image_url: string;
  };
}

export interface GameProperties {
  header?: {
    type: string;
    value: {
      title: string;
      description: string;
    }
  };
  play_button_text?: string;
  nooutcome?: Outcome;
  outcome?: Outcome;
  background_image?: Asset;
}

export interface TreeDisplayProperties extends GameProperties {
  number_of_gifts_shown?: number;
  number_of_gifts_to_drop: number;
  gift_image: Asset;
  tree_image: Asset;
  waiting_image?: Asset;
  celebrating_image?: Asset;
  number_of_taps: number;
}

export interface ScratchDisplayProperties extends GameProperties {
  prescratch_image: Asset;
  post_success_image: Asset;
  post_fail_image: Asset;
}

export interface PinataDisplayProperties extends GameProperties {
  still_image: Asset;
  cracking_image?: Asset;
  opened_image: Asset;
  number_of_taps: number;
}

export interface SpinDisplayProperties extends GameProperties {
  number_of_wedges: number;
  wedges: SpinWedge[];
  background_image: Asset;
  rim_image: Asset;
  wheel_image?: Asset;
  wheel_position: string;
  pointer_image: Asset;
}

export interface SpinWedge {
  position: number;
  color: string;
  image: Asset;
  has_reward: boolean;
}

export interface Game {
  campaign_id?: number;
  display_properties: TreeDisplayProperties | PinataDisplayProperties | ScratchDisplayProperties | SpinDisplayProperties;
  game_type: GameType;
  id: number;
  number_of_tries: number;
  state: null;
  user_account_id: number;
}

interface GamesResponse {
  data: Game[];
}

interface GameResponse {
  data: Game;
}

interface IV4PlayResponse {
  data: {
    campaign_id: number;
    game_id: number;
    id: number;
    outcomes: IV4Voucher[];
    state: 'reserved' | 'issued';
    use_account_id: number;
  };
}

interface IV4LightGameCampaign {
  id: number;
  name: string;
  begins_at: string;
  images: {
    url: string;
    type: string;
  }[];
}

interface IV4GameCampaigns {
  data: IV4LightGameCampaign[];
}

const gamesCacheBuster: Subject<boolean> = new Subject();
const gamesCacheDecider: (response: any) => boolean = res => res && !(res instanceof HttpErrorResponse); // don't cache if empty/error
// dynamic to allow imprinting of cacheDecider into decorator
// @dynamic
@Injectable({
  providedIn: 'root'
})
export class V4GameService implements IGameService {
  private hostName: string;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.hostName = config.apiHost as string;
      });
  }

  private static v4GameToGame(game: Game): IGame {
    const gameMapperFetcher = {
      shake_the_tree: new ShakeV4ToV4Mapper(),
      hit_the_pinata: new TapV4ToV4Mapper(),
      scratch_card: new ScratchV4ToV4Mapper(),
      spin_the_wheel: new SpinV4ToV4Mapper(),
    };
    // get the correct mapper and apply it
    const gameMapper = gameMapperFetcher[game.game_type];
    if (!gameMapper) {
      throw new Error(`${game.game_type} is not mapped yet`);
    }
    return gameMapper.v4MapToMap(game);
  }

  public play(gameId: number): Observable<IPlayOutcome> {
    return this.httpClient.put<IV4PlayResponse>(`${this.hostName}/v4/games/${gameId}/play`, null)
      .pipe(
        tap(() => gamesCacheBuster.next(true)), // bust the cache if games has been updated
        map((res: IV4PlayResponse) => {
          // @ts-ignore
          const vs: IV4Voucher[] = res.data.outcomes.filter((out) => out.outcome_type === 'reward');
          return {
            vouchers: vs.map(v => V4VouchersService.v4VoucherToVoucher(v)),
            rawPayload: res
          };
        })
      );
  }

  @Cacheable({
    cacheBusterObserver: gamesCacheBuster,
    shouldCacheDecider: gamesCacheDecider,
    maxCacheCount: 50
  })
  public get(gameId: number): Observable<IGame> {
    return this.httpClient.get<GameResponse>(`${this.hostName}/v4/games/${gameId}`)
      .pipe(
        map(res => res.data),
        map(game => V4GameService.v4GameToGame(game))
      );
  }

  @Cacheable({
    cacheBusterObserver: gamesCacheBuster,
    shouldCacheDecider: gamesCacheDecider,
    maxCacheCount: 50
  })
  public getGamesFromCampaign(campaignId: number): Observable<IGame[]> {
    return this.httpClient.get<GamesResponse>(`${this.hostName}/v4/campaigns/${campaignId}/games`)
      .pipe(
        map(res => res.data),
        map((games: Game[]) => games.filter((game: Game) => game.game_type !== GameType.quiz)),
        map((games: Game[]) => games.map((game: Game): IGame => V4GameService.v4GameToGame(game))),
        catchError(_ => EMPTY)
      );
  }

  // @ts-ignore
  public prePlay(gameId: number): Observable<IEngagementTransaction> {
    return this.httpClient
      .put<IV4PlayResponse>(`${this.hostName}/v4/games/${gameId}/reserve`, null)
      .pipe(
        tap(() => gamesCacheBuster.next(true)),
        map(res => ({
          id: res.data.id,
          voucherIds: res.data.outcomes.map(
            outcome => outcome.id
          ).filter(id => id),
          rewardIds: res.data.outcomes.reduce((accRewardIds, currVouch) => {
            if (currVouch.reward) {
              return accRewardIds.concat(currVouch.reward.id);
            }
            return accRewardIds;
          }, [] as number[])
        })),
        catchError((err: HttpErrorResponse) => {
          let errorStateObj: { errorState: string };
          if (err.error && err.error.message && err.error.code && err.error.code === 40) {
            errorStateObj = { errorState: err.error.mesage };
            if (err.error.message.match(/move/i)) {
              errorStateObj = { errorState: Error400States.move };
            } else if (err.error.message.match(/balance/i)) {
              errorStateObj = { errorState: Error400States.balance };
            }
            return throwError(errorStateObj);
          }
          return throwError(err);
        })
      );
  }

  public prePlayConfirm(gameId: number): Observable<IPlayOutcome | void> {
    // todo: transactionId is used as the game/engagementId until preplay games are implemented in v4
    return this.httpClient
      .put<IV4PlayResponse>(`${this.hostName}/v4/game_transactions/${gameId}/confirm`, null)
      .pipe(
        tap(() => gamesCacheBuster.next(true)), // bust the cache if games has been updated
        map((res: IV4PlayResponse) => {
          // @ts-ignore
          const vs: IV4Voucher[] = res.data.outcomes.filter((out) => out.outcome_type === 'reward');
          return {
            vouchers: vs.map(v => V4VouchersService.v4VoucherToVoucher(v)),
            rawPayload: res
          };
        })
      );
  }

  public getActiveGames(): Observable<IGame[]> {
    return this.httpClient.get<IV4GameCampaigns>(`${this.hostName}/v4/campaigns?campaign_type=game`)
      .pipe(
        map(res => res.data),
        map(cs => {
          const now = (new Date()).getTime();
          return cs.filter(c => {
            if (c.begins_at === null) {
              return true;
            }
            const beginsAt = new Date(c.begins_at);
            return beginsAt.getTime() <= now;
          });
        }),
        // for each campaign, fetch associated games
        switchMap((cs: IV4LightGameCampaign[]) => combineLatest([
          ...cs.map(c => of(c)),
          ...cs.map(c => this.getGamesFromCampaign(c.id))
        ])),
        map((s: (IV4LightGameCampaign | IGame[])[]) => {
          // split again the campaigns from the games
          // @ts-ignore
          const campaigns: IV4LightGameCampaign[] = s.splice(0, s.length / 2);
          // @ts-ignore
          const games: IGame[][] = s;
          const res: IGame[] = [];
          // eslint-disable-next-line guard-for-in
          for (const i in games) {
            const gs = games[i].filter(game => game.type !== TYPE.quiz);
            // if there is no underlying game, move on to next campaign
            if (gs.length === 0) {
              continue;
            }
            const g = gs[0];
            const c = campaigns[i];
            g.imgUrl = oc(c).images[0].url();
            res.push(g);
          }
          return res;
        })
      );
  }
}
