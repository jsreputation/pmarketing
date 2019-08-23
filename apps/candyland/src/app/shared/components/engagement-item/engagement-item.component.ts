import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Engagement } from '@cl-core/models/engagement.model';

@Component({
  selector: 'cl-engagement-item',
  templateUrl: './engagement-item.component.html',
  styleUrls: ['./engagement-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EngagementItemComponent {
  @Input() public data: Engagement;

}
