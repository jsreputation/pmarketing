import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cl-info-hint',
  templateUrl: './info-hint.component.html',
  styleUrls: ['./info-hint.component.scss']
})
export class InfoHintComponent implements OnInit {
  @Input() public classList = '';

  constructor() { }

  public ngOnInit() {
  }

}
