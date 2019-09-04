import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TapRoutingModule } from './tap-routing.module';
import { TapComponent } from './tap/tap.component';
import { GameModule, GameService } from '@perx/core';
import { MatButtonModule } from '@angular/material';
import { of } from 'rxjs';
import { games } from '../mock/games.mock';

const gameServiceStub = {
  get: (id: number) => of(games[id]),
  getGamesFromCampaign: (id: number) => of(games.filter(game => game.campaignId === id))
};

@NgModule({
  declarations: [TapComponent],
  imports: [
    CommonModule,
    GameModule,
    MatButtonModule,
    TapRoutingModule
  ],
  providers: [
    { provide: GameService, useValue: gameServiceStub },
  ]
})
export class TapModule { }
