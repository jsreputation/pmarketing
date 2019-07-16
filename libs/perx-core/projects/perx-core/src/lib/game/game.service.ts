import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvConfig } from './env-config';
import { IGameService } from './iGameService';
import { IGame, GAME_TYPE as TYPE, defaultTree, ITree, IPinata, defaultPinata } from './game.model';
import { map } from 'rxjs/operators';

enum GAME_TYPE {
  shakeTheTree = 'shake_the_tree',
  pinata = 'hit_the_pinata'
}
interface Asset {
  type: string;
  value: {
    filename: string;
    image_id: number;
    image_url: string;
  };
}

interface TreeDisplayProperties {
  number_of_gifts_shown?: number;
  number_of_gifts_to_drop: number;
  gift_image: Asset;
  tree_image: Asset;
  waiting_image: Asset;
  celebrating_image: Asset;
}

interface PinataDisplayProperties {
  still_image: Asset;
  cracking_image?: Asset;
  opened_image: Asset;
}

interface Game {
  campaign_id: number;
  display_properties: TreeDisplayProperties|PinataDisplayProperties;
  game_type: GAME_TYPE;
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

@Injectable({
  providedIn: 'root'
})
export class GameService implements IGameService {
  private hostName: string;

  constructor(private httpClient: HttpClient, config: EnvConfig) {
    this.hostName = config.env.apiHost;
  }

  public play(gameId: number): Observable<any> {
    return this.httpClient.put(`${this.hostName}/v4/games/${gameId}/play`, null);
  }

  public get(gameId: number): Observable<IGame> {
    return this.httpClient.get<GameResponse>(`${this.hostName}/v4/games/${gameId}`)
      .pipe(
        map(res => res.data),
        map(game => {
          let type = TYPE.unknown;
          let config: ITree | IPinata;
          switch (game.game_type) {
            case GAME_TYPE.shakeTheTree:
              type = TYPE.shakeTheTree;
              config = {
                ...defaultTree(),
                treeImg: (game.display_properties as TreeDisplayProperties).tree_image.value.image_url,
                giftImg: (game.display_properties as TreeDisplayProperties).gift_image.value.image_url,
                nbHangedGift: (game.display_properties as TreeDisplayProperties).number_of_gifts_shown,
                nbGiftsToDrop: (game.display_properties as TreeDisplayProperties).number_of_gifts_to_drop,
                nbTaps: 5,
                waitingAccessoryImg: (game.display_properties as TreeDisplayProperties).waiting_image.value.image_url,
                celebratingAccessoryImg: (game.display_properties as TreeDisplayProperties).celebrating_image.value.image_url
              };
              break;
            case GAME_TYPE.pinata:
                type = TYPE.pinata;
                config = {
                  ...defaultPinata(),
                  stillImg: (game.display_properties as PinataDisplayProperties).still_image.value.image_url,
                  brokenImg: (game.display_properties as PinataDisplayProperties).opened_image.value.image_url,
                  nbTaps: 5
                };
                break;
          }
          return {
            id: game.id,
            campaignId: game.campaign_id,
            type,
            remainingNumberOfTries: game.number_of_tries,
            config
          };
        })
      );
  }

  public getGamesFromCampaign(campaignId: number): Observable<IGame[]> {
    return this.httpClient.get<GamesResponse>(`${this.hostName}/v4/campaigns/${campaignId}/games`)
      .pipe(
        map(res => res.data),
        map((games: Game[]) => {
          return games.map((game: Game): IGame => {
            let type = TYPE.unknown;
            let config: ITree | IPinata;
            switch (game.game_type) {
              case GAME_TYPE.shakeTheTree:
                type = TYPE.shakeTheTree;
                config = {
                  ...defaultTree(),
                  treeImg: (game.display_properties as TreeDisplayProperties).tree_image.value.image_url,
                  giftImg: (game.display_properties as TreeDisplayProperties).gift_image.value.image_url,
                  nbHangedGift: (game.display_properties as TreeDisplayProperties).number_of_gifts_shown,
                  nbGiftsToDrop: (game.display_properties as TreeDisplayProperties).number_of_gifts_to_drop,
                  nbTaps: 5,
                  waitingAccessoryImg: (game.display_properties as TreeDisplayProperties).waiting_image.value.image_url,
                  celebratingAccessoryImg: (game.display_properties as TreeDisplayProperties).celebrating_image.value.image_url
                };
                break;
              case GAME_TYPE.pinata:
                  type = TYPE.pinata;
                  config = {
                    ...defaultPinata(),
                    stillImg: (game.display_properties as PinataDisplayProperties).still_image.value.image_url,
                    brokenImg: (game.display_properties as PinataDisplayProperties).opened_image.value.image_url,
                    nbTaps: 5
                  };
                  break;
            }

            return {
              id: game.id,
              campaignId: game.campaign_id,
              type,
              remainingNumberOfTries: game.number_of_tries,
              config
            };
          });
        })
      );
  }
}
