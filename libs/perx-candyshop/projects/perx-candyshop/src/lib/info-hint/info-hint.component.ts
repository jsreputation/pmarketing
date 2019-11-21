import { Component, Input } from '@angular/core';

@Component({
  selector: 'cs-info-hint',
  templateUrl: './info-hint.component.html',
  styleUrls: ['./info-hint.component.scss']
})
export class InfoHintComponent {
  @Input() public classList: string = '';
}
