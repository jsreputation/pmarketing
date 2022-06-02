/* eslint-disable @typescript-eslint/tslint/config */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'hangseng-enroll-game-button',
  templateUrl: './enroll-game-button.component.html',
  styleUrls: ['./enroll-game-button.component.scss']
})
export class EnrollGameButtonComponent {

  @Input() disabled: boolean;
  @Input() buttonStyle: any;

  @Output() onEnroll: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
