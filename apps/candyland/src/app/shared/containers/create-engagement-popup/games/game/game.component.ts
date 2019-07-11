import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IGame } from '../shared/models/game-model';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'cl-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnChanges {
  @Input() public game: IGame;
  @Input() public selectedGame: IGame;
  @Output() public selectGame = new EventEmitter<IGame>();

  public basePath = 'assets/images/games/';
  public control: FormControl;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createControl();
    this.setControl();
  }

  public onSelect(): void {
    this.selectGame.emit(this.game);
  }

  private createControl(): void {
    this.control = this.fb.control(null);
  }

  private setControl(): void {
    if (this.control) {
      this.control.setValue(this.checked());
    }
  }

  private checked(): number {
    if (this.game && this.selectedGame && this.game.id === this.selectedGame.id) {
      return this.selectedGame.id;
    }
  }

  ngOnChanges(): void {
    this.setControl();
  }

}
