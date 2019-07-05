import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cl-engagement-item',
  templateUrl: './engagement-item.component.html',
  styleUrls: ['./engagement-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EngagementItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
