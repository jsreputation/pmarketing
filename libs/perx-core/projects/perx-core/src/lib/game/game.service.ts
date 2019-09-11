import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IGameService } from './iGameService';
import { IGame, GameType as TYPE, defaultTree, ITree, IPinata, defaultPinata, IGameOutcome } from './game.model';
import { catchError, map } from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { Config } from '../config/config';

const enum GameType {
  shakeTheTree = 'shake_the_tree',
  pinata = 'hit_the_pinata'
}

interface Asset {
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
  waiting_image?: Asset;
  celebrating_image?: Asset;
}

interface PinataDisplayProperties extends GameProperties {
  still_image: Asset;
  cracking_image?: Asset;
  opened_image: Asset;
}

interface Game {
  campaign_id: number;
  display_properties: TreeDisplayProperties|PinataDisplayProperties;
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

  constructor(private httpClient: HttpClient, config: Config) {
    this.hostName = config.apiHost as string;
  }

  private static v4GameToGame(game: Game): IGame {
    let type = TYPE.unknown;
    let config: ITree|IPinata;
    switch (game.game_type) {
      case GameType.shakeTheTree:
        type = TYPE.shakeTheTree;
        const dpts: TreeDisplayProperties = game.display_properties as TreeDisplayProperties;
        config = {
          ...defaultTree(),
          treeImg: dpts.tree_image.value.image_url || dpts.tree_image.value.file,
          giftImg: dpts.gift_image.value.image_url || dpts.gift_image.value.file,
          nbHangedGift: dpts.number_of_gifts_shown,
          nbGiftsToDrop: dpts.number_of_gifts_to_drop,
          nbTaps: 5,
          waitingAccessoryImg: oc(dpts).waiting_image.value.image_url() || oc(dpts).waiting_image.value.file(),
          celebratingAccessoryImg: oc(dpts).celebrating_image.value.image_url() || oc(dpts).celebrating_image.value.file()
        };
        break;
      case GameType.pinata:
        type = TYPE.pinata;
        const dpps: PinataDisplayProperties = game.display_properties as PinataDisplayProperties;
        config = {
          ...defaultPinata(),
          stillImg: dpps.still_image.value.image_url || dpps.still_image.value.file,
          brokenImg: dpps.opened_image.value.image_url || dpps.opened_image.value.file,
          breakingImg: oc(dpps).cracking_image.value.image_url() || oc(dpps).cracking_image.value.file(),
          nbTaps: 5
        };

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
      backgroundImg: oc(game).display_properties.background_image.value.image_url() ||
        oc(game).display_properties.background_image.value.file(),
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
          if (games.length === 0) {
            throw new Error('Games list is empty');
          }
          return games.map((game: Game): IGame => GameService.v4GameToGame(game));
        }),
        catchError((err) => {
          // rethrow error for subscriber to handle
          return throwError(err);
        })
      );
  }
}
