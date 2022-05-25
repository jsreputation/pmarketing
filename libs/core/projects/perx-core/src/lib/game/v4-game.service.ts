import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { combineLatest, EMPTY, Observable, of, Subject, throwError } from 'rxjs';
import { IGameService } from './igame.service';
import { GameType as TYPE, IEngagementTransaction, IGame, IPlayOutcome, } from './game.model';
import { catchError, expand, map, reduce, switchMap, tap } from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { IV4Voucher, V4VouchersService } from '../vouchers/v4-vouchers.service';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { Cacheable } from 'ngx-cacheable';
import {
  PlinkoV4ToV4Mapper,
  ScratchV4ToV4Mapper,
  ShakeV4ToV4Mapper,
  SpinV4ToV4Mapper,
  TapV4ToV4Mapper
} from './v4-game.mapper';
import { TransactionState } from '../transactions/models/transactions.model';
import { OutcomeType } from '../outcome/models/outcome.model';
import { ICampaignService } from '../campaign/icampaign.service';
import { IV4BadgeOutcome, IV4PointsOutcome, V4CampaignService } from '../campaign/v4-campaign.service';
import { IV4PrizeSetOutcome, V4PrizeSetOutcomeService } from '../prize-set-outcome/v4-prize-set-outcome.service';
import { CampaignType, ICampaign } from '../campaign/models/campaign.model';

const enum GameType {
  shakeTheTree = 'shake_the_tree',
  pinata = 'hit_the_pinata',
  scratch = 'scratch_card',
  spin = 'spin_the_wheel',
  quiz = 'quiz',
  survey = 'survey'
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
  // intentionally not mapped to IGame
  button_colour?: string;
  // intentionally not mapped to IGame
  button_text_colour?: string;
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
    header_colour?: string;
    subheader_colour?: string;
    value: {
      title: string;
      description: string;
    }
  };
  play_button_text?: string;
  play_button_text_colour?: string;
  play_button_colour?: string;
  nooutcome?: Outcome;
  outcome?: Outcome;
  background_image?: Asset;
  landing_page: {
    headline: string;
    sub_headline: string;
    body_text: string;
    image: Asset;
  }
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

export interface PlinkoDisplayProperties extends GameProperties {
  background_image?: Asset;
  target_image?: Asset;
  stage_color?: string;
  ball_color?: string;
  game_duration?: number;
}

export interface Game {
  campaign_id?: number;
  display_properties: TreeDisplayProperties | PinataDisplayProperties | ScratchDisplayProperties | SpinDisplayProperties
  | PlinkoDisplayProperties;
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

interface IV4RewardOutcome extends IV4Voucher {
  outcome_type: OutcomeType.reward;
}

interface IV4PlayGeneral {
  campaign_id: number;
  game_id: number;
  id: number;
  use_account_id: number;
  state: TransactionState;
  outcomes: (IV4RewardOutcome | IV4PointsOutcome | IV4PrizeSetOutcome | IV4BadgeOutcome)[];
}

interface IV4PlayResponse {
  data: IV4PlayGeneral;
}

// interface IV4LightGameCampaign {
//   id: number;
//   name: string;
//   begins_at: string;
//   images: {
//     url: string;
//     type: string;
//   }[];
// }

// interface IV4GameCampaigns {
//   data: IV4LightGameCampaign[];
// }

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
    private configService: ConfigService,
    private campaignService: ICampaignService
  ) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.hostName = config.apiHost as string;
      });
  }

  private static v4GameToGame(game: Game, campaign?: ICampaign): IGame {
    const gameMapperFetcher = {
      shake_the_tree: new ShakeV4ToV4Mapper(),
      hit_the_pinata: new TapV4ToV4Mapper(),
      scratch_card: new ScratchV4ToV4Mapper(),
      spin_the_wheel: new SpinV4ToV4Mapper(),
      plinko: new PlinkoV4ToV4Mapper(),
    };
    // get the correct mapper and apply it
    const gameMapper = gameMapperFetcher[game.game_type];
    if (!gameMapper) {
      throw new Error(`${game.game_type} is not mapped yet`);
    }
    return {
      ...gameMapper.v4MapToMap(game),
      campaignName: campaign ? campaign.name : '',
      campaignDescription: campaign ? campaign.description : '',
      isOperating: campaign?.isOperating,
      operatingHours: campaign?.operatingHours
    };
  }

  public play(gameId: number): Observable<IPlayOutcome> {
    return this.httpClient.put<IV4PlayResponse>(`${this.hostName}/v4/games/${gameId}/play`, null)
      .pipe(
        tap(() => gamesCacheBuster.next(true)), // bust the cache if games has been updated
        map((res: IV4PlayResponse) => this.generatePlayReturn(res))
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
  public getGamesFromCampaign(campaign: ICampaign): Observable<IGame[]> {
    return this.httpClient.get<GamesResponse>(`${this.hostName}/v4/campaigns/${campaign.id}/games`)
      .pipe(
        map(res => res.data),
        map((games: Game[]) => games.filter((game: Game) => game.game_type !== GameType.quiz && game.game_type !== GameType.survey)),
        map((games: Game[]) => games.map((game: Game): IGame => V4GameService.v4GameToGame(game, campaign)))
      );
  }

  // @ts-ignore
  public prePlay(gameId: number): Observable<IEngagementTransaction> {
    return this.httpClient
      .put<IV4PlayResponse>(`${this.hostName}/v4/games/${gameId}/reserve`, null)
      .pipe(
        tap(() => gamesCacheBuster.next(true)),
        map(res => {
          const rewards = res.data.outcomes.filter(outcome => outcome.id && outcome.outcome_type === OutcomeType.reward) as IV4Voucher[];
          const points = res.data.outcomes.filter(outcome =>
            outcome.id && outcome.outcome_type === OutcomeType.points) as IV4PointsOutcome[];
          const badges = res.data.outcomes.filter(outcome =>
            outcome.id && outcome.outcome_type === OutcomeType.badge) as IV4BadgeOutcome[];
          const v4PrizeSets = res.data.outcomes.filter(outcome => outcome.id &&
            outcome.outcome_type === OutcomeType.prizeSet) as IV4PrizeSetOutcome[];
          return {
            id: res.data.id,
            voucherIds: rewards.map(
              outcome => outcome.id
            ),
            rewardIds: rewards.reduce((accRewardIds, currVouch) => {
              if (currVouch.reward) {
                return accRewardIds.concat(currVouch.reward.id);
              }
              return accRewardIds;
            }, [] as number[]),
            points: points.map(point => V4CampaignService.v4PointsToPoints(point)),
            prizeSets: v4PrizeSets.map(prizeSet => V4PrizeSetOutcomeService.v4PrizeSetOutcomeToPrizeSetOutcome(prizeSet)),
            badges: badges.map(badge => V4CampaignService.v4BadgeToBadge(badge))
          };
        }),
        catchError((err: HttpErrorResponse) => throwError(err))
        // {
        // let errorStateObj: { errorState: string };
        // if (err.error && err.error.message && err.error.code && err.error.code === 40) {
        //   errorStateObj = { errorState: err.error.mesage };
        //   if (err.error.message.match(/move/i)) {
        //     errorStateObj = { errorState: Error400States.move };
        //   } else if (err.error.message.match(/balance/i)) {
        //     errorStateObj = { errorState: Error400States.balance };
        //   }
        //   return throwError(errorStateObj);
        // }
        // return throwError(err);
        // })
      );
  }

  public prePlayConfirm(gameId: number): Observable<IPlayOutcome | void> {
    // todo: transactionId is used as the game/engagementId until preplay games are implemented in v4
    return this.httpClient
      .put<IV4PlayResponse>(`${this.hostName}/v4/game_transactions/${gameId}/confirm`, null)
      .pipe(
        tap(() => gamesCacheBuster.next(true)), // bust the cache if games has been updated
        map((res: IV4PlayResponse) => this.generatePlayReturn(res))
      );
  }

  private generatePlayReturn(res: IV4PlayResponse): IPlayOutcome {
    const v4Vouchers: IV4Voucher[] = res.data.outcomes.filter((out) => out.outcome_type === OutcomeType.reward) as IV4Voucher[];
    const v4Points: IV4PointsOutcome[] = res.data.outcomes.filter((out) => out.outcome_type === OutcomeType.points) as IV4PointsOutcome[];
    const v4Badges: IV4BadgeOutcome[] =
      res.data.outcomes.filter((out) => out.outcome_type === OutcomeType.badge) as IV4BadgeOutcome[];
    const v4PrizeSets: IV4PrizeSetOutcome[] = res.data.outcomes.filter((out) =>
      out.outcome_type === OutcomeType.prizeSet) as IV4PrizeSetOutcome[];
    const vouchers = v4Vouchers.map(voucher => V4VouchersService.v4VoucherToVoucher(voucher));
    const points = v4Points.map(point => V4CampaignService.v4PointsToPoints(point));
    const badges = v4Badges.map(badge => V4CampaignService.v4BadgeToBadge(badge));
    const prizeSets = v4PrizeSets.map(prizeSet => V4PrizeSetOutcomeService.v4PrizeSetOutcomeToPrizeSetOutcome(prizeSet));
    return {
      ...(vouchers && vouchers.length && { vouchers }),
      ...(points && { points }),
      ...(badges && { badges }),
      ...(prizeSets && { prizeSets }),
      rawPayload: res
    };
  }

  public getActiveGames(): Observable<IGame[]> {
    return this.campaignService.getCampaigns({ page: 1, type: CampaignType.game })
      .pipe(
        // i + 2 because index starts at 0, but for the next call, page 2 needs to load.
        expand((cs, i) => cs.length !== 0 ? this.campaignService.getCampaigns({ page: i + 2, type: CampaignType.game }) : EMPTY),
        reduce((acc, cs) => acc.concat(cs)),
        map(cs => {
          const now = (new Date()).getTime();
          return cs.filter(c => {
            if (c.beginsAt === null) {
              return true;
            }
            return !!(c.beginsAt && c.beginsAt.getTime() <= now);
          });
        }),
        // for each campaign, fetch associated games
        switchMap((cs: ICampaign[]) => combineLatest([
          ...cs.map(c => of(c)),
          ...cs.map(c => this.getGamesFromCampaign(c).pipe(
            catchError((err) => {
              console.log(err);
              return of([]);
            })))
        ])),
        map((s: (ICampaign | IGame[])[]) => {
          // split again the campaigns from the games
          // @ts-ignore
          const campaigns: ICampaign[] = s.splice(0, s.length / 2);
          // @ts-ignore
          const games: IGame[][] = s;
          const res: IGame[] = [];
          // eslint-disable-next-line guard-for-in
          for (const i in games) {
            const gs = games[i].filter(game => game.type !== TYPE.quiz && game.type !== TYPE.survey);
            // if there is no underlying game, move on to next campaign
            if (gs.length === 0) {
              continue;
            }
            const g = gs[0];
            const c = campaigns[i];
            g.imgUrl = oc(c).thumbnailUrl();
            res.push(g);
          }
          return res;
        })
      );
  }
}
