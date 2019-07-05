import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGame } from './shared/models/game-model';
import { GamesType } from './shared/games-type';

@Component({
  selector: 'cl-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  @Input() public selectedGame: IGame;
  @Output() public selectGame = new EventEmitter<IGame>();

  public gamesType: IGame[] = GamesType;
  constructor() { }

  ngOnInit() {
  }

  public setGame(game: IGame): void {
    this.selectedGame = game;
    this.selectGame.emit(game);
  }

}
