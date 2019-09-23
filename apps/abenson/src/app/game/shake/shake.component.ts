import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  IGame
} from '@perx/core';

@Component({
  selector: 'app-shake',
  templateUrl: './shake.component.html',
  styleUrls: ['./shake.component.scss']
})
export class ShakeComponent  {
  @Input() public game: IGame;
  @Output() public broken: EventEmitter<void> = new EventEmitter();
  public isEnabled: boolean = false;
}
