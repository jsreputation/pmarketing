import { HttpClient } from '@angular/common/http';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import {
  IGame,
  GameType as TYPE,
  defaultTree,
  ITree,
  IPinata,
  IScratch,
  defaultScratch,
  defaultPinata,
  IPlayOutcome,
  IEngagementTransaction
} from './game.model';
import { Observable, combineLatest, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IGameService } from './igame.service';
import { Config } from '../config/config';
import { IVoucherService } from '../vouchers/ivoucher.service';
import {
  IWGameEngagementAttributes,
  IWCampaignAttributes,
  IWAssignedAttributes,
  IWTreeDisplayProperties,
  IWPinataDisplayProperties,
  WGameType,
  IJsonApiItemPayload,
  IJsonApiItem,
  IWAttbsObjTrans,
  IWScratchDisplayProperties,
  IWCampaignDisplayProperties,
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class WhistlerGameService implements IGameService {
  private hostName: string;
  // basic cache
  private cache: { [gId: number]: IGame } = {};

  constructor(
    private http: HttpClient,
    config: Config,
    private whistVouchSvc: IVoucherService
  ) {
    this.hostName = config.apiHost as string;
  }

  private static WGameToGame(game: IJsonApiItem<IWGameEngagementAttributes>): IGame {
    let type = TYPE.unknown;
    let config: ITree | IPinata | IScratch;
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
        // underlyingImg: scratchdp.post_scratch_fail_img_url,
        underlyingImg: scratchdp.post_scratch_success_img_url,
        coverImg: scratchdp.pre_scratch_img_url
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

    const imgUrl: string = attributes.image_url;

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
          (outcome: IJsonApiItem<IWAssignedAttributes>) => this.whistVouchSvc.get(Number.parseInt(outcome.id, 10))
        )).pipe(
          map((vouchArr) => vouchArr.reduce((acc, currVouch) =>
            ({ ...acc, vouchers: [...acc.vouchers, currVouch] }), { vouchers: [], rawPayload: res })
          ))
      ))
    );
  }

  public get(engagementId: number): Observable<IGame> {
    if (this.cache[engagementId]) {
      return of(this.cache[engagementId]);
    }
    return this.http.get<IJsonApiItemPayload<IWGameEngagementAttributes>>(`${this.hostName}/game/engagements/${engagementId}`)
      .pipe(
        map(res => res.data),
        map(game => WhistlerGameService.WGameToGame(game)),
        tap(game => this.cache[engagementId] = game)
      );
  }

  public getGamesFromCampaign(campaignId: number): Observable<IGame[]> {
    let disProp: IWCampaignDisplayProperties = null;
    return this.http.get<IJsonApiItemPayload<IWCampaignAttributes>>(`${this.hostName}/campaign/entities/${campaignId}`)
      .pipe(
        map((res: IJsonApiItemPayload<IWCampaignAttributes>) => res.data.attributes),
        map((entity: IWCampaignAttributes) => {
          disProp = entity.display_properties;
          return entity.engagement_id;
        }),
        switchMap((correctId: number) => this.get(correctId)),
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
  public prePlayConfirm(transactionId: number): Observable<void> {
    const body = {
      data: {
        type: 'transactions',
        id: transactionId,
        attributes: {
          status: 'confirmed'
        }
      }
    };
    return this.http.patch<IJsonApiItemPayload<IWAttbsObjTrans>>(
      `${this.hostName}/game/transactions/${transactionId}`,
      body,
      { headers: { 'Content-Type': 'application/vnd.api+json' } }
    ).pipe(
      // @
      map(() => void 0)
    );
  }

}
