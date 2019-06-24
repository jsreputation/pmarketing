import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvConfig } from './env-config';
import { IGameService } from './iGameService';
import { IGame, GAME_TYPE as TYPE, defaultTree, ITree } from './game.model';
import { map } from 'rxjs/operators';

enum GAME_TYPE {
  shakeTheTree = 'shake_the_tree',
}
interface Asset {
  type: string;
  value: {
    filename: string;
    image_id: number;
    image_url: string;
  };
}
interface Game {
  campaign_id: number;
  display_properties: {
    number_of_gifts_shown?: number;
    number_of_gifts_to_drop: number;
    gift_image: Asset,
    tree_image: Asset,
    waiting_image: Asset,
    celebrating_image: Asset
  };
  game_type: GAME_TYPE;
  id: number;
  number_of_tries: number;
  state: null;
  user_account_id: number;
}

interface GamesResponse {
  data: Game[];
}

@Injectable({
  providedIn: 'root'
})
export class GameService implements IGameService {
  private hostName: string;

  constructor(private httpClient: HttpClient, config: EnvConfig) {
    this.hostName = config.env.apiHost;
  }

  play(gameId: number): Observable<any> {
    return this.httpClient.put(`${this.hostName}/v4/games/${gameId}/play`, null);
  }

  getGamesFromCampaign(campaignId: number): Observable<IGame[]> {
    return this.httpClient.get<GamesResponse>(`${this.hostName}/v4/campaigns/${campaignId}/games`)
      .pipe(
        map(res => res.data),
        map((games: Game[]) => {
          return games.map((game: Game): IGame => {
            let config: ITree;
            switch (game.game_type) {
              case GAME_TYPE.shakeTheTree:
                config = {
                  ...defaultTree(),
                  treeImg: game.display_properties.tree_image.value.image_url,
                  giftImg: game.display_properties.gift_image.value.image_url,
                  nbHangedGift: game.display_properties.number_of_gifts_shown,
                  nbGiftsToDrop: game.display_properties.number_of_gifts_to_drop,
                  nbTaps: 5,
                  waitingAccessoryImg: game.display_properties.waiting_image.value.image_url,
                  celebratingAccessoryImg: game.display_properties.celebrating_image.value.image_url
                };
                break;
            }

            return {
              id: game.id,
              campaignId: game.campaign_id,
              type: TYPE.shakeTheTree,
              remainingNumberOfTries: game.number_of_tries,
              config
            };
          });
        })
      );
  }
}
