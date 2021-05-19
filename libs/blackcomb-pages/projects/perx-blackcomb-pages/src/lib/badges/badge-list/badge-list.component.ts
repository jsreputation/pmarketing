import { Component, Input } from '@angular/core';
import { IBadge } from '@perxtech/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-core-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss'],
})
export class BadgeListComponent {
  @Input() public badges: Observable<IBadge[]>;
}
