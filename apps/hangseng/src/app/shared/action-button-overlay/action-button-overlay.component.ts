/* eslint-disable @typescript-eslint/tslint/config */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'hangseng-action-button-overlay',
  templateUrl: './action-button-overlay.component.html',
  styleUrls: ['./action-button-overlay.component.scss'],
})
export class ActionButtonOverlayComponent {
  @Input() disabled: boolean;
  @Input() buttonStyle: any;
  @Input() label: string;
  @Input() imageSrc: string;
  @Input() buttonLabel: string;

  @Output() onPress: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
}
