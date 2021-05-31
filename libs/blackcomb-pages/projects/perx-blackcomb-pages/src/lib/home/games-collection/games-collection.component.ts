import { listAnimation } from './games-collection.animation';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService, IConfig, IGame, ITheme, ThemesService } from '@perxtech/core';
import { Router } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-games-collection',
  templateUrl: './games-collection.component.html',
  styleUrls: ['./games-collection.component.scss'],
  animations: [listAnimation]
})
export class GamesCollectionComponent implements OnInit {
  @Input('games')
  public games$: Observable<IGame[]>;
  public defaultNbGames: number = 2;
  public showAllGames: boolean = false;
  public buttonStyle: { [key: string]: string } = {};
  public appConfig: IConfig<void>;
  public isCampaignDisabled: boolean[] = [];

  constructor(
    private themesService: ThemesService,
    private configService: ConfigService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.themesService.getThemeSetting().subscribe( (theme: ITheme) => {
      this.buttonStyle['background-color'] = theme.properties['--button_background_color'] ? theme.properties['--button_background_color'] : '';
      this.buttonStyle.color = theme.properties['--button_text_color'] ? theme.properties['--button_text_color'] : '';
    });

    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.appConfig = config;
      }
    );

    this.games$.subscribe((games: IGame[]) => {
      for (const game of games) {
        this.isCampaignDisabled[game.id] = !this.isGameOperating(game);
      }
    });
  }

  public isGameOperating(game: IGame): boolean {
    return game?.isOperating || false;
  }

  public selectGame(game: IGame) {
    if(!this.isCampaignDisabled[game.id]) {
      this.router.navigate([ `/game/${game.campaignId}` ]);
    }
  }
}
