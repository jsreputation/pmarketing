import { WhistlerVouchersService } from './../vouchers/whistler-vouchers.service';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, catchError } from 'rxjs/operators';
import {
  IGame,
  GameType as TYPE,
  defaultTree,
  ITree,
  IPinata,
  defaultPinata,
  IPlayOutcome
} from './game.model';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { IGameService } from './igame.service';
import { Config } from '../config/config';
import { IJsonApiItemPayload, IJsonApiItem } from '../jsonapi.payload';
import { IVoucher } from '../vouchers/models/voucher.model';

const enum GameType {
  shakeTheTree = 'shake',
  pinata = 'tap'
}

interface AttbsObjGame {
  number_of_tries?: number;
  urn: string;
  created_at: string;
  updated_at: string;
  game_type: string;
  type?: string;
  title: string;
  description: string;
  image_url: string;
  properties: {};
  display_properties: GameDisplayProperties;
}

interface AttbsObjEntity {
  comm_channel: null;
  created_at: string;
  end_date_time: null;
  engagement_id: number;
  engagement_type: string;
  goal: null;
  name: string;
  pool_id: null;
  start_date_time: null;
  status: string;
  updated_at: string;
  urn: string;
}

interface AttbsObjTrans {
  urn: string;
  created_at: string;
  updated_at: string;
  engagement_id: number;
  campaign_entity_id: number;
  user_id: number;
  results: ResultsObj;
}

interface ResultsObj {
    id: number;
    type: string;
    attributes: {
        campaign_entity_id: number;
        source_type: number;
        source_id: number;
        urn: string;
        created_at: string;
        updated_at: string;
        results: Outcome[];
    };
}

interface GameDisplayProperties {
  title: string;
  button: string;
  sub_title: string;
  nooutcome?: Outcome;
  outcome?: Outcome;
  background_image?: string;
}

interface Outcome {
  id: number;
  type: string;
  attributes: {
    source_type: string;
    source_id: number;
    urn: string;
    created_at: string;
    updated_at: string;
    code: string;
    status: string;
    start_date: string;
    end_date: string;
    assigned_to_id: number
  };
}

interface TreeDisplayProperties extends GameDisplayProperties {
  tree_img_url: string;
  nb_hanged_gifts: number;
  gift_box_img_url: string;
  background_img_url: string;
  // waiting_image?: string;
  // celebrating_image?: string;
}

interface PinataDisplayProperties extends GameDisplayProperties {
  closed_pinata_img_url: string;
  cracking_pinata_img_url: string;
  opened_pinata_img_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class WhistlerGameService implements IGameService {
  private hostName: string;
  constructor(
    private http: HttpClient,
    config: Config,
    private wVouchSvc: WhistlerVouchersService) {
    this.hostName = config.apiHost as string;
  }

  private static WGameToGame(game: IJsonApiItem<AttbsObjGame>): IGame {
    let type = TYPE.unknown;
    let config: ITree | IPinata;
    const { attributes } = game;
    if (attributes.game_type === GameType.shakeTheTree) {
      type = TYPE.shakeTheTree;
      const treedp: TreeDisplayProperties = attributes.display_properties as TreeDisplayProperties;
      config = {
        ...defaultTree(),
        treeImg: treedp.tree_img_url,
        giftImg: treedp.gift_box_img_url,
        nbHangedGift: treedp.nb_hanged_gifts
      };
    } else if (attributes.game_type === GameType.pinata) {
      type = TYPE.pinata;
      const pinatadp: PinataDisplayProperties = attributes.display_properties as PinataDisplayProperties;
      config = {
        ...defaultPinata(),
        stillImg: pinatadp.closed_pinata_img_url,
        breakingImg: pinatadp.cracking_pinata_img_url,
        brokenImg: pinatadp.opened_pinata_img_url
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

    return {
      id: +game.id,
      type,
      remainingNumberOfTries: 1,
      config,
      texts,
      results: {}
    };

  }

  private static subscribeAndRevealVouch(voucher$: Observable<IVoucher>): IVoucher {
    let voucher: IVoucher;
    voucher$.subscribe(v => {
      voucher = v;
    });
    return voucher;
  }

  // @ts-ignore
  public play(campaignId: number, gameId: number): Observable<IPlayOutcome> {
    const body = {
      data: {
        type: 'transactions',
        attributes: {
          engagement_id: gameId,
          campaign_entity_id: campaignId }
      }
    };
    return this.http.post<IJsonApiItemPayload<AttbsObjTrans>>
    (`${this.hostName}/game/transactions`, body, {
      headers: {'Content-Type': 'application/vnd.api+json'}
    }).pipe(
        map(res => ({
            vouchers:
            res.data.attributes.results.attributes.results.map(v =>
               (WhistlerGameService.subscribeAndRevealVouch(this.wVouchSvc.get(v.id)))
            ),
            rawPayload: res
          })
        )
    );
  }

  public get(engagementId: number): Observable<IGame> {
    return this.http.get<IJsonApiItemPayload<AttbsObjGame>>(`${this.hostName}/game/engagements/${engagementId}`)
    .pipe(
      map(res => res.data),
      map(game => WhistlerGameService.WGameToGame(game))
    );
  }

  public getGamesFromCampaign(campaignId: number): Observable<IGame[]> {
    return this.http.get<IJsonApiItemPayload<AttbsObjEntity>>(`${this.hostName}/campaign/entities/${campaignId}`)
      .pipe(
        map(res => res.data.attributes),
        map(correctEntityAttribute => correctEntityAttribute.engagement_id),
        switchMap(correctId => this.get(correctId)),
        map((game: IGame) => [game]),
        catchError(err => throwError(err))
      );
  }

}
