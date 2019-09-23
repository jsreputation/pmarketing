import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import {
  IGame,
  GameType as TYPE,
  defaultTree,
  ITree,
  IPinata,
  defaultPinata,
  // IGameOutcome,
  IPlayOutcome
} from './game.model';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IGameService } from './igame.service';
import { Config } from '../config/config';
import { IJsonApiItemPayload, IJsonApiItem } from '../jsonapi.payload';

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

interface GameDisplayProperties {
  title: string;
  button: string;
  sub_title: string;
  // nooutcome?: Outcome;
  // outcome?: Outcome;
  background_image?: string;
}

// interface Outcome {
//   button_text: string;
//   description: string;
//   title: string;
//   type?: string;
//   value?: {
//     file: string;
//     filename: string;
//     image_id: number;
//     image_url: string;
//   };
// }

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

// interface Game {
//   id: number;
//   type: string;
//   links?: { self: string };
//   attributes: AttbsObjGame;
// }

// interface GameResponse {
//   data: Game;
// }

// interface IWPlayResponse {
//   data: {
//     game_id: number;
//     id: number;
//     outcomes: IWhistlerVoucher[];
//     state: string;
//   };
// }

// interface CampaignResponse {
//   data: Entity[];
// }

// interface Entity {
//   id: number;
//   links?: { self: string };
//   attributes: AttbsObjEntity;
// }

@Injectable({
  providedIn: 'root'
})
export class WhistlerGameService implements IGameService {
  private hostName: string;
  constructor(
    private http: HttpClient,
    config: Config) {
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

    // const results: { [key: string]: IGameOutcome } = {};

    // if (attributes.display_properties.outcome) {
    //   results.outcome = WhistlerGameService.outcomeToGameOutcome(attributes.display_properties.outcome);
    // }
    // if (attributes.display_properties.nooutcome) {
    //   results.noOutcome = WhistlerGameService.outcomeToGameOutcome(attributes.display_properties.nooutcome);
    // }

    return {
      id: +game.id,
      type,
      remainingNumberOfTries: 1,
      config,
      texts,
      results: {}
    };

  }
  // not implemented yet
  // private static outcomeToGameOutcome(outcome: Outcome): IGameOutcome {
  //   const res: IGameOutcome = {
  //     title: outcome.title,
  //     subTitle: outcome.description,
  //     button: outcome.button_text
  //   };
  //   if (outcome.type === 'image') {
  //     res.image = outcome.value.image_url;
  //   }
  //   return res;
  // }

  // @ts-ignore
  public play(id: number): Observable<IPlayOutcome> {
    return throwError('not implemented yet');
    // return this.http.put<IWPlayResponse>(`${this.hostName}/game/engagements/${id}`, null)
    //   .pipe(
    //     pluck('data'),
    //     map(game => WhistlerGameService.WGameToGame(game))
    //   );
  }
  // using the gameID = engagementID
  public get(gameId: number): Observable<IGame> {
    return this.http.get<IJsonApiItemPayload<AttbsObjGame>>(`${this.hostName}/game/engagements/${gameId}`)
      .pipe(
        map(res => res.data),
        map(game => WhistlerGameService.WGameToGame(game)),
        // catchError(() => {
        //   // ignore any errors and hope next one succeed
        //   return empty();
        // })
      );
  }

  public getGamesFromCampaign(campaignId: number): Observable<IGame[]> {
    return this.http.get<IJsonApiItemPayload<AttbsObjEntity>>(`${this.hostName}/campaign/entities/${campaignId}`)
      .pipe(
        map(res => res.data.attributes),
        map(correctEntityAttribute => correctEntityAttribute.engagement_id),
        switchMap(correctId => this.get(correctId)),
        map((game: IGame) => [game])
        // catchError(err => throwError(err))
      );
  }

}
