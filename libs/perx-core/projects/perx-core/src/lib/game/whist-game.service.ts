import { HttpClient } from '@angular/common/http';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import {
  IGame,
  GameType as TYPE,
  defaultTree,
  ITree,
  IPinata,
  defaultPinata,
  IPlayOutcome
} from './game.model';
import { Observable, combineLatest, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IGameService } from './igame.service';
import { Config } from '../config/config';
import { IJsonApiItemPayload, IJsonApiItem } from '../jsonapi.payload';
import { IVoucherService } from '../vouchers/ivoucher.service';
import {
  WGameOutcome,
  WAttbsObjGame,
  WTreeDisplayProperties,
  WPinataDisplayProperties,
  WAttbsObjEntity,
  WGameType
} from '@perx/whistler';

interface AttbsObjTrans {
  urn: string;
  created_at: string;
  updated_at: string;
  engagement_id: number;
  campaign_entity_id: number;
  user_id: number;
  results: IJsonApiItem<ResultsObj>;
}

interface ResultsObj {
  campaign_entity_id: number;
  source_type: number;
  source_id: number;
  urn: string;
  created_at: string;
  updated_at: string;
  results: IJsonApiItem<WGameOutcome>[];
}

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

  private static WGameToGame(game: IJsonApiItem<WAttbsObjGame>): IGame {
    let type = TYPE.unknown;
    let config: ITree | IPinata;
    const { attributes } = game;
    if (attributes.game_type === WGameType.shakeTheTree) {
      type = TYPE.shakeTheTree;
      const treedp: WTreeDisplayProperties = attributes.display_properties as WTreeDisplayProperties;
      config = {
        ...defaultTree(),
        treeImg: treedp.tree_img_url,
        giftImg: treedp.gift_box_img_url,
        nbHangedGift: treedp.nb_hanged_gifts,
        nbGiftsToDrop: treedp.nb_gifts_to_drop || 1
      };
    } else if (attributes.game_type === WGameType.pinata) {
      type = TYPE.pinata;
      const pinatadp: WPinataDisplayProperties = attributes.display_properties as WPinataDisplayProperties;
      config = {
        ...defaultPinata(),
        stillImg: pinatadp.closed_pinata_img_url,
        breakingImg: pinatadp.cracking_pinata_img_url,
        brokenImg: pinatadp.opened_pinata_img_url
      };
    } else if (attributes.game_type === WGameType.scratch) {
      type = TYPE.scratch;
      // todo
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
          campaign_entity_id: campaignId
        }
      }
    };
    return this.http.post<IJsonApiItemPayload<AttbsObjTrans>>(
      `${this.hostName}/game/transactions`,
      body,
      { headers: { 'Content-Type': 'application/vnd.api+json' } }
    ).pipe(
      mergeMap(res => (
        combineLatest(...res.data.attributes.results.attributes.results.map(
          (outcome: IJsonApiItem<WGameOutcome>) => this.whistVouchSvc.get(Number.parseInt(outcome.id, 10))
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
    return this.http.get<IJsonApiItemPayload<WAttbsObjGame>>(`${this.hostName}/game/engagements/${engagementId}`)
      .pipe(
        map(res => res.data),
        map(game => WhistlerGameService.WGameToGame(game)),
        tap(game => this.cache[engagementId] = game)
      );
  }

  public getGamesFromCampaign(campaignId: number): Observable<IGame[]> {
    let displayProperties: any = null;
    return this.http.get<IJsonApiItemPayload<WAttbsObjEntity>>(`${this.hostName}/campaign/entities/${campaignId}`)
      .pipe(
        map((res: IJsonApiItemPayload<WAttbsObjEntity>) => res.data.attributes),
        map((entity: WAttbsObjEntity) => {
          displayProperties = entity.display_properties;
          return entity.engagement_id;
        }),
        switchMap((correctId: number) => this.get(correctId)),
        map((game: IGame) => ([{ ...game, campaignId, displayProperties }]))
      );
  }
}
