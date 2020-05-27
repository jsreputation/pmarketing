import { listAnimation } from './games-collection.animation';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IGame } from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-games-collection',
  templateUrl: './games-collection.component.html',
  styleUrls: ['./games-collection.component.scss'],
  animations: [listAnimation]
})
export class GamesCollectionComponent {
  @Input('games')
  public games$: Observable<IGame[]>;
  public defaultNbGames: number = 2;
  public showAllGames: boolean = false;
}
