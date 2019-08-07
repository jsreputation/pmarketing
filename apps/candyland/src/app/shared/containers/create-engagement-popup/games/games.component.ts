import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cl-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  @Input() public selectedGame: IGraphic;
  @Input() public graphicList: IGraphic[];
  @Output() public selectGame: EventEmitter<IGraphic> = new EventEmitter<IGraphic>();

  public setGame(game: IGraphic): void {
    this.selectedGame = game;
    this.selectGame.emit(game);
  }
}
