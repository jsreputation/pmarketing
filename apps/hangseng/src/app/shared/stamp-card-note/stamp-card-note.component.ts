/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/tslint/config */
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'hangseng-stamp-card-note',
  templateUrl: './stamp-card-note.component.html',
  styleUrls: ['./stamp-card-note.component.scss']
})
export class StampCardNoteComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() buttonLabel: string = 'Read more';

  @Output() onPress: EventEmitter<any> = new EventEmitter<any>();


  constructor() {}
}
