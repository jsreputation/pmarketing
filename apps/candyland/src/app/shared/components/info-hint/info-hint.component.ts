import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-info-hint',
  templateUrl: './info-hint.component.html',
  styleUrls: ['./info-hint.component.scss']
})
export class InfoHintComponent {
  @Input() public classList = '';
}
