import {HttpClient} from '@angular/common/http';
import {map, mergeMap, retry, switchMap, takeLast, tap} from 'rxjs/operators';
import {
  defaultPinata,
  defaultScratch, defaultSnake,
  defaultSpin,
  defaultTree,
  GameType as TYPE,
  IEngagementTransaction,
  IGame,
  IPinata,
  IPlayOutcome,
  IScratch,
  ISnake,
  ISpin,
  ITree,
  IGameOutcome
} from './game.model';
import {combineLatest, Observable, of, Subscriber} from 'rxjs';
import {Injectable, Optional} from '@angular/core';
import {IGameService} from './igame.service';
import {Config} from '../config/config';
import {IVoucherService} from '../vouchers/ivoucher.service';
import {
  IJsonApiItem,
  IJsonApiItemPayload,
  IWAssignedAttributes,
  IWAttbsObjTrans,
  IWCampaignAttributes,
  IWCampaignDisplayProperties,
  IWGameEngagementAttributes,
  IWPinataDisplayProperties,
  IWScratchDisplayProperties,
  IWSnakeDisplayProperties,
  IWSpinDisplayProperties,
  IWTreeDisplayProperties,
  WGameType,
} from '@perx/whistler';
import { WhistlerVouchersService } from '../vouchers/whistler-vouchers.service';
import { ICampaignService } from '../campaign/icampaign.service';
import { ICampaign, CampaignType } from '../campaign/models/campaign.model';
import { AuthenticationService } from '../auth/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WhistlerGameService implements IGameService {

  constructor(
    private http: HttpClient,
    config: Config,
    private voucherService: IVoucherService,
    @Optional() private campaignService?: ICampaignService,
    @Optional() private auth?: AuthenticationService
  ) {
    this.hostName = config.apiHost as string;
  }

  private get whistlerVoucherService(): WhistlerVouchersService {
    return this.voucherService as WhistlerVouchersService;
  }
  private hostName: string;
  // basic cache
  private cache: { [gId: number]: IGame } = {};

  private static WGameToGame(game: IJsonApiItem<IWGameEngagementAttributes>): IGame {
    let type = TYPE.unknown;
    let config: ITree | IPinata | IScratch | ISpin | ISnake | null = null;
    const { attributes } = game;
    if (attributes.game_type === WGameType.shakeTheTree) {
      type = TYPE.shakeTheTree;
      const treedp: IWTreeDisplayProperties = attributes.display_properties as IWTreeDisplayProperties;
      config = {
        ...defaultTree(),
        treeImg: treedp.tree_img_url,
        giftImg: treedp.gift_box_img_url,
        nbHangedGift: treedp.nb_hanged_gifts,
        nbGiftsToDrop: treedp.nb_gifts_to_drop || 1
      };
    } else if (attributes.game_type === WGameType.pinata) {
      type = TYPE.pinata;
      const pinatadp: IWPinataDisplayProperties = attributes.display_properties as IWPinataDisplayProperties;
      config = {
        ...defaultPinata(),
        stillImg: pinatadp.closed_pinata_img_url,
        breakingImg: pinatadp.cracking_pinata_img_url,
        brokenImg: pinatadp.opened_pinata_img_url
      };
    } else if (attributes.game_type === WGameType.scratch) {
      type = TYPE.scratch;
      const scratchdp: IWScratchDisplayProperties = attributes.display_properties as IWScratchDisplayProperties;
      config = {
        ...defaultScratch(),
        underlyingSuccessImg: scratchdp.post_scratch_success_img_url,
        underlyingFailImg: scratchdp.post_scratch_fail_img_url,
        coverImg: scratchdp.pre_scratch_img_url
      };
    } else if (attributes.game_type === WGameType.spin) {
      type = TYPE.spin;
      const spindp: IWSpinDisplayProperties = attributes.display_properties as IWSpinDisplayProperties;
      config = {
        ...defaultSpin(),
        numberOfWedges: spindp.nb_of_wedges,
        rewardSlots: spindp.slots,
        colorCtrls: Object.assign(spindp.wedge_colors),
        rewardIcon: spindp.reward_icon,
        wheelImg: spindp.wheel_img,
        wheelPosition: spindp.wheel_position,
        pointerImg: spindp.pointer_img
      };
    } else if (attributes.game_type === WGameType.snake) {
      type = TYPE.snake;
      const snakedp: IWSnakeDisplayProperties = attributes.display_properties as IWSnakeDisplayProperties;
      config = {
        ...defaultSnake(),
        snakeHead: snakedp.snake_head_img_url,
        snakeBody: snakedp.snake_body_img_url,
        targetIcon: snakedp.target_icon_img_url,
        gameArea: snakedp.game_area_img_url,
        targetRequired: snakedp.target_required
      };
    }

    const texts: { [key: string]: string } = {};
    if (attributes.display_properties.title) {
      texts.title = attributes.display_properties.title;
      texts.subTitle = attributes.display_properties.sub_title;
    }
    if (attributes.display_properties.button) {
      texts.button = attributes.display_properties.button;
    }

    const imgUrl: string | undefined = attributes.image_url ? attributes.image_url : undefined;

    const backgroundImg: string | undefined = attributes.display_properties.background_img_url ?
      attributes.display_properties.background_img_url : undefined;

    return {
      id: +game.id,
      type,
      remainingNumberOfTries: 1,
      config,
      texts,
      backgroundImg,
      imgUrl,
      results: {}
    };
  }

  private static compareGamesByCid(a: IGame, b: IGame): number {
    if (!a.campaignId) {
      return -1;
    }
    if (!b.campaignId) {
      return 1;
    }
    return a.campaignId - b.campaignId;
  }

  public play(campaignId: number, gameId: number): Observable<IPlayOutcome> {
    const body = {
      data: {
        type: 'transactions',
        attributes: {
          engagement_id: gameId,
          campaign_entity_id: campaignId,
          status: 'confirmed'
        }
      }
    };
    return this.http.post<IJsonApiItemPayload<IWAttbsObjTrans>>(
      `${this.hostName}/game/transactions`,
      body,
      { headers: { 'Content-Type': 'application/vnd.api+json' } }
    ).pipe(
      mergeMap(res => (
        combineLatest(...res.data.attributes.results.attributes.results.map(
          (outcome: IJsonApiItem<IWAssignedAttributes>) => this.whistlerVoucherService.getFullVoucher(outcome)
        )).pipe(
          map((vouchArr) => vouchArr.reduce((acc, currVouch) =>
            ({ ...acc, vouchers: [...acc.vouchers, currVouch] }), { vouchers: [], rawPayload: res })
          ))
      ))
    );
  }

  public get(engagementId: number, campaignId?: number): Observable<IGame> {
    if (this.cache[engagementId]) {
      return of(this.cache[engagementId]);
    }
    const campaignIdParams: string = campaignId ? `?campaign_id=${campaignId}` : '';
    return this.http.get<IJsonApiItemPayload<IWGameEngagementAttributes>>(`${this.hostName}/game/engagements/${engagementId}${campaignIdParams}`)
      .pipe(
        map(res => res.data),
        map(game => WhistlerGameService.WGameToGame(game)),
        tap(game => this.cache[engagementId] = game)
      );
  }

  public getGamesFromCampaign(campaignId: number): Observable<IGame[]> {
    let disProp: IWCampaignDisplayProperties | null = null;
    return this.http.get<IJsonApiItemPayload<IWCampaignAttributes>>(`${this.hostName}/campaign/entities/${campaignId}`)
      .pipe(
        map((res: IJsonApiItemPayload<IWCampaignAttributes>) => res.data.attributes),
        map((entity: IWCampaignAttributes) => {
          disProp = { ...entity.display_properties };
          return entity.engagement_id;
        }),
        switchMap((correctId: number) => this.get(correctId, campaignId)),
        map((game: IGame) => ([{ ...game, campaignId, displayProperties: { ...game.displayProperties, ...disProp } }]))
      );
  }

  public prePlay(engagementId: number, campaignId?: number): Observable<IEngagementTransaction> {
    const body = {
      data: {
        type: 'transactions',
        attributes: {
          engagement_id: engagementId,
          campaign_entity_id: campaignId,
          status: 'reserved'
        }
      }
    };
    return this.http.post<IJsonApiItemPayload<IWAttbsObjTrans>>(
      `${this.hostName}/game/transactions`,
      body,
      { headers: { 'Content-Type': 'application/vnd.api+json' } }
    ).pipe(
      map(res => ({
        id: Number.parseInt(res.data.id, 10),
        voucherIds: res.data.attributes.results.attributes.results.map(
          (outcome: IJsonApiItem<IWAssignedAttributes>) => Number.parseInt(outcome.id, 10)
        )
      }))
    );
  }
  public prePlayConfirm(transactionId: number, informationCollectionSetting?: string): Observable<void> {
    const body = {
      data: {
        type: 'transactions',
        id: transactionId,
        attributes: {
          status: 'confirmed'
        }
      }
    };
    if ((informationCollectionSetting === 'pi_required'
      || informationCollectionSetting === 'signup_required')
      && this.checkAnonymous()) {
      return of();
    }
    return this.http.patch<IJsonApiItemPayload<IWAttbsObjTrans>>(
      `${this.hostName}/game/transactions/${transactionId}`,
      body,
      { headers: { 'Content-Type': 'application/vnd.api+json' } }
    ).pipe(
      // @
      map(() => void 0)
    );
  }

  public getActiveGames(): Observable<IGame[]> {
    return (new Observable((subject: Subscriber<IGame[]>) => {
      const gameByCid: { [cid: number]: IGame } = {};
      if (this.campaignService === undefined) {
        console.log('getActiveGames: this requires injecting an instance of ICampaignService into WhistlerGameService to work');
        subject.complete();
        return;
      }
      const sub = this.campaignService.getCampaigns({ type: CampaignType.game })
        .pipe(
          map((cs: ICampaign[]) => cs.filter(c => c.type === CampaignType.game)),
          map((cs: ICampaign[]) => cs.filter(c => gameByCid[c.id] === undefined)),
          mergeMap((arrOfCampaigns: ICampaign[]) => {
            let gameIds: number[] = arrOfCampaigns.map(c => c.engagementId)
              .filter((id: number) => id !== undefined) as number[];
            gameIds = gameIds.filter((item, index) => gameIds.indexOf(item) === index);
            return combineLatest(
              ...gameIds.filter(id => id !== undefined)
                .map((id: number) => this.get(id)
                  .pipe(
                    retry(1),
                    map((g: IGame) => {
                      const existingCampaign = arrOfCampaigns.find(c => c.engagementId === g.id);
                      const existingCampaignId = existingCampaign && existingCampaign.id;
                      return { ...g, campaignId: existingCampaignId };
                    }),
                    tap((g: IGame) => {
                      const matchingCampaigns = arrOfCampaigns.filter(c => c.engagementId === g.id);
                      matchingCampaigns.forEach(c => {
                        const campaignId = c.id;
                        gameByCid[c.id] = { ...g, campaignId };
                      });
                      subject.next(Object.values(gameByCid).sort(WhistlerGameService.compareGamesByCid));
                    })
                  ))
            );
          }),
          // this is to make sure that we complete the observable only on the last
          takeLast(1)
        ).subscribe(() => subject.complete());
      return () => sub.unsubscribe();
    }));
  }

  private checkAnonymous(): boolean {
    if (!this.auth) {
      console.log('AuthenticationService is required for check Anonymous');
      return false;
    }
    return this.auth.getAnonymous();
  }

  public getSuccessOutcome(game: IGame): Observable<IGameOutcome> {
    const { displayProperties } = game;
    if (displayProperties && displayProperties.successPopUp) {
      return of({
        title: displayProperties.successPopUp.headLine as string,
        subTitle: displayProperties.successPopUp.subHeadLine as string,
        image: displayProperties.successPopUp.imageURL as string,
        button: displayProperties.successPopUp.buttonTxt as string
      });
    }

    return of({
      title: '',
      subTitle: '',
      button: ''
    });
  }

  public getNoOutcome(game: IGame): Observable<IGameOutcome>{
    const { displayProperties } = game;
    if (displayProperties && displayProperties.noRewardsPopUp) {
      return of({
        title: displayProperties.noRewardsPopUp.headLine as string,
        subTitle: displayProperties.noRewardsPopUp.subHeadLine as string,
        image: displayProperties.noRewardsPopUp.imageURL as string,
        button: displayProperties.noRewardsPopUp.buttonTxt as string
      });
    }

    return of({
      title: '',
      subTitle: '',
      button: ''
    });
  }
}
