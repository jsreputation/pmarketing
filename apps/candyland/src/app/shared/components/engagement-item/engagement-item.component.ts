import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cl-engagement-item',
  templateUrl: './engagement-item.component.html',
  styleUrls: ['./engagement-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EngagementItemComponent implements OnInit {
  @Input() data: Engagement;

  constructor() { }

  ngOnInit() {
  }

}
