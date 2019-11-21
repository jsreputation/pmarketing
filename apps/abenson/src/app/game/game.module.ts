import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModule as PerxGameModule, IGameService, IPlayOutcome, IGame } from '@perx/core';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';
import { Observable, of } from 'rxjs';
import { games } from '../mock/games.mock';

const gameServiceStub = {
  play: (): Observable<IPlayOutcome> => of({} as IPlayOutcome),
  getGamesFromCampaign: (campaignId: number): Observable<IGame[]> => of(games.filter(el => el.campaignId === campaignId)),
  get: (gameId: number): Observable<IGame> => of(games.find(el => el.id === gameId) || {} as IGame)
};

@NgModule({
  declarations: [GameComponent, ShakeComponent, TapComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    PerxGameModule
  ],
  providers: [
    { provide: IGameService, useValue: gameServiceStub }
  ]
})
export class GameModule { }
