import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShakeRoutingModule } from './shake-routing.module';
import { ShakeComponent } from './shake/shake.component';
import { GameModule, IGameService } from '@perx/core';
import { MatButtonModule } from '@angular/material';
import { of } from 'rxjs';
import { games } from '../mock/games.mock';

const gameServiceStub = {
  get: (id: number) => of(games[id]),
  getGamesFromCampaign: (id: number) => of(games.filter(game => game.campaignId === id))
};

@NgModule({
  declarations: [
    ShakeComponent
  ],
  imports: [
    CommonModule,
    GameModule,
    MatButtonModule,
    ShakeRoutingModule
  ],
  providers: [
    { provide: IGameService, useValue: gameServiceStub },
  ]
})
export class ShakeModule { }
