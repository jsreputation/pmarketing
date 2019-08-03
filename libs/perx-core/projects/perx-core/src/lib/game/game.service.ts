import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvConfig } from '../shared/env-config';
import { IGameService } from './iGameService';
import { IGame, GAME_TYPE as TYPE, defaultTree, ITree, IPinata, defaultPinata, IGameOutcome } from './game.model';
import { map } from 'rxjs/operators';
import { oc } from 'ts-optchain';

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

interface Outcome {
  button_text: string;
  description: string;
  title: string;
  type?: string;
  value?: {
    filename: string;
    image_id: number;
    image_url: string;
  };
}

interface GameProperties {
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

interface TreeDisplayProperties extends GameProperties {
  number_of_gifts_shown?: number;
  number_of_gifts_to_drop: number;
  gift_image: Asset;
  tree_image: Asset;
  waiting_image: Asset;
  celebrating_image: Asset;
}

interface PinataDisplayProperties extends GameProperties {
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

interface IV4PlayResponse {
  data: {
    campaign_id: number;
    game_id: number;
    id: number;
    outcomes: {
      reward: any;
      voucher_code: any;
    }[];
    state: string;
    use_account_id: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GameService implements IGameService {
  private hostName: string;

  constructor(private httpClient: HttpClient, config: EnvConfig) {
    this.hostName = config.env.apiHost as string;
  }

  private static v4GameToGame(game: Game): IGame {
    let type = TYPE.unknown;
    let config: ITree|IPinata;
    switch (game.game_type) {
      case GAME_TYPE.shakeTheTree:
        type = TYPE.shakeTheTree;
        const dpts: TreeDisplayProperties = game.display_properties as TreeDisplayProperties;
        config = {
          ...defaultTree(),
          treeImg: dpts.tree_image.value.image_url,
          giftImg: dpts.gift_image.value.image_url,
          nbHangedGift: dpts.number_of_gifts_shown,
          nbGiftsToDrop: dpts.number_of_gifts_to_drop,
          nbTaps: 5,
          waitingAccessoryImg: dpts.waiting_image.value.image_url,
          celebratingAccessoryImg: dpts.celebrating_image.value.image_url
        };
        break;
      case GAME_TYPE.pinata:
        type = TYPE.pinata;
        const dpps: PinataDisplayProperties = game.display_properties as PinataDisplayProperties;
        config = {
          ...defaultPinata(),
          stillImg: dpps.still_image.value.image_url,
          brokenImg: dpps.opened_image.value.image_url,
          nbTaps: 5
        };

        if (dpps.cracking_image) {
          config.breakingImg = dpps.cracking_image.value.image_url;
        }

        break;
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
      results.outcome = GameService.outcomeToGameOutcome(game.display_properties.outcome);
    }
    if (game.display_properties.nooutcome) {
      results.noOutcome = GameService.outcomeToGameOutcome(game.display_properties.nooutcome);
    }

    return {
      id: game.id,
      campaignId: game.campaign_id,
      type,
      backgroundImg: oc(game).display_properties.background_image.value.image_url(),
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
    if (outcome.type === 'image' && outcome.value) {
      res.image = outcome.value.image_url;
    }

    return res;
  }

  public play(gameId: number): Observable<any> {
    return this.httpClient.put<IV4PlayResponse>(`${ this.hostName }/v4/games/${ gameId }/play`, null);
  }

  public get(gameId: number): Observable<IGame> {
    return this.httpClient.get<GameResponse>(`${ this.hostName }/v4/games/${ gameId }`)
      .pipe(
        map(res => res.data),
        map(game => GameService.v4GameToGame(game))
      );
  }

  public getGamesFromCampaign(campaignId: number): Observable<IGame[]> {
    return this.httpClient.get<GamesResponse>(`${ this.hostName }/v4/campaigns/${ campaignId }/games`)
      .pipe(
        map(res => res.data),
        map((games: Game[]) => {
          return games.map((game: Game): IGame => GameService.v4GameToGame(game));
        })
      );
  }
}
