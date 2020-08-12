import { listAnimation } from './games-collection.animation';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IGame, ThemesService, ITheme } from '@perxtech/core';

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

  constructor(private themesService: ThemesService) {}

  public ngOnInit(): void {
    this.themesService.getThemeSetting().subscribe( (theme: ITheme) => {
      this.buttonStyle['background-color'] = theme.properties['--button_background_color'] ? theme.properties['--button_background_color'] : '';
      this.buttonStyle.color = theme.properties['--button_text_color'] ? theme.properties['--button_text_color'] : '';
    });
  }
}
