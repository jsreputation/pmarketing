import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGraphic } from '../../../models/graphick.model';

@Component({
  selector: 'cl-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  @Input() public selectedGame: IGraphic;
  @Input() public graphicList: IGraphic[];
  @Output() public selectGame = new EventEmitter<IGraphic>();

  constructor() { }

  ngOnInit() {
  }

  public setGame(game: IGraphic): void {
    this.selectedGame = game;
    this.selectGame.emit(game);
  }

}
