import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, of, combineLatest, throwError, EMPTY, Subject} from 'rxjs';
import { IGameService } from './igame.service';
import {
  IGame,
  GameType as TYPE,
  defaultTree,
  ITree,
  IPinata,
  IScratch,
  defaultPinata,
  IGameOutcome,
  IPlayOutcome,
  IEngagementTransaction,
  defaultScratch,
  Error400States,
  defaultSpin,
  ISpin
} from './game.model';
import {
  catchError,
  map,
  publishReplay,
  switchMap, take, tap,
} from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { IV4Voucher, V4VouchersService } from '../vouchers/v4-vouchers.service';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { patchUrl } from '../utils/patch-url.function';
import { Cacheable } from 'ngx-cacheable';

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

interface Outcome {
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
  wedge_colors: string[];
  background_image: Asset;
  reward_image: Asset;
  rim_image: Asset;
  wheel_image?: Asset;
  wheel_position: string;
  pointer_image: Asset;
}

interface Game {
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
// cache
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
    let type = TYPE.unknown;
    let config: ITree | IPinata | IScratch | ISpin;
    if (game.game_type === GameType.shakeTheTree) {
      type = TYPE.shakeTheTree;
      const dpts: TreeDisplayProperties = game.display_properties as TreeDisplayProperties;
      const defaultTr = defaultTree();
      config = {
        ...defaultTr,
        treeImg: dpts.tree_image.value.image_url || dpts.tree_image.value.file,
        giftImg: dpts.gift_image.value.image_url || dpts.gift_image.value.file,
        nbHangedGift: oc(dpts).number_of_gifts_shown(defaultTr.nbHangedGift),
        nbGiftsToDrop: dpts.number_of_gifts_to_drop,
        nbTaps: dpts.number_of_taps || 5,
        waitingAccessoryImg: oc(dpts).waiting_image.value.image_url() || oc(dpts).waiting_image.value.file(),
        celebratingAccessoryImg: oc(dpts).celebrating_image.value.image_url() || oc(dpts).celebrating_image.value.file()
      };
    } else if (game.game_type === GameType.pinata) {
      type = TYPE.pinata;
      const dpps: PinataDisplayProperties = game.display_properties as PinataDisplayProperties;
      config = {
        ...defaultPinata(),
        stillImg: dpps.still_image.value.image_url || dpps.still_image.value.file,
        brokenImg: dpps.opened_image.value.image_url || dpps.opened_image.value.file,
        breakingImg: oc(dpps).cracking_image.value.image_url() || oc(dpps).cracking_image.value.file(),
        nbTaps: dpps.number_of_taps || 5
      };
    } else if (game.game_type === GameType.scratch) {
      type = TYPE.scratch;
      const dpps: ScratchDisplayProperties = game.display_properties as ScratchDisplayProperties;
      config = {
        ...defaultScratch(),
        coverImg: oc(dpps).prescratch_image.value.image_url() || oc(dpps).prescratch_image.value.file(),
        underlyingSuccessImg: oc(dpps).post_success_image.value.image_url() || oc(dpps).post_success_image.value.file(),
        underlyingFailImg: oc(dpps).post_fail_image.value.image_url() || oc(dpps).post_success_image.value.file()
      };
      ['coverImg', 'underlyingSuccessImg', 'underlyingFailImg']
        .filter(attribute => config[attribute] !== undefined)
        .forEach(attribute => config[attribute] = patchUrl(config[attribute]));

    } else if (game.game_type === GameType.spin) {
      type = TYPE.spin;
      const dpps: SpinDisplayProperties = game.display_properties as SpinDisplayProperties;
      config = {
        ...defaultSpin(),
        numberOfWedges: dpps.number_of_wedges,
        colorCtrls: Object.assign(dpps.wedge_colors),
        rewardIcon: oc(dpps).reward_image.value.image_url(''),
        wheelImg: oc(dpps).rim_image.value.image_url(''),
        wheelPosition: oc(dpps).wheel_position('center'),
        pointerImg: oc(dpps).pointer_image.value.image_url(''),
        background: oc(dpps).background_image.value.image_url('')
      };
      ['rewardIcon', 'wheelImg', 'pointerImg', 'background']
        .filter(attribute => config[attribute] !== undefined)
        .forEach(attribute => config[attribute] = patchUrl(config[attribute]));
      // Display the reward Slot on the last wedge
      config.rewardSlots = [dpps.number_of_wedges - 1];
    } else {
      throw new Error(`${game.game_type} is not mapped yet`);
    }
    const texts: { [key: string]: string } = {};
    if (game.display_properties.header) {
      texts.title = game.display_properties.header.value.title;
      texts.subTitle = game.display_properties.header.value.description;
    }

    if (game.display_properties.play_button_text) {
      texts.button = game.display_properties.play_button_text;
    }

    const results: { [key: string]: IGameOutcome } = {};

    if (game.display_properties.outcome) {
      results.outcome = V4GameService.outcomeToGameOutcome(game.display_properties.outcome);
    }
    if (game.display_properties.nooutcome) {
      results.noOutcome = V4GameService.outcomeToGameOutcome(game.display_properties.nooutcome);
    }

    let backgroundImg = oc(game).display_properties.background_image.value.image_url() ||
      oc(game).display_properties.background_image.value.file('');
    if (backgroundImg.startsWith('http')) {
      backgroundImg = patchUrl(backgroundImg);
    }

    return {
      id: game.id,
      campaignId: game.campaign_id,
      type,
      backgroundImg,
      remainingNumberOfTries: game.number_of_tries,
      config,
      texts,
      results
    };
  }

  private static outcomeToGameOutcome(outcome: Outcome): IGameOutcome {
    const res: IGameOutcome = {
      title: outcome.title,
      subTitle: outcome.description,
      button: outcome.button_text
    };
    if (outcome.type === 'image') {
      res.image = oc(outcome).value.image_url() || oc(outcome).value.file();
    }

    return res;
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
        tap(res => console.log(res, 'am i being called?')),
        map(res => res.data),
        map((games: Game[]) => games.filter((game: Game) => game.game_type !== GameType.quiz)),
        map((games: Game[]) => games.map((game: Game): IGame => V4GameService.v4GameToGame(game))),
        publishReplay(1), // note: observe that changing to shareReplay causes http call to be doubled
        // due to home comp's nested campaigns calling this mtd too (check home component)
        // && home call of this method completing before nested campaigns subcription, causing a fresh instance
        take(1), // to ensure completion
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
