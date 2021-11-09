import { Component, Input } from '@angular/core';

@Component({
  selector: 'bdo-ghost-cards',
  templateUrl: './card-ghost.component.html',
  styleUrls: [
    './card-ghost.component.scss',
  ]
})
export class GhostCardComponent {
  // data contained inside is irrelevant
  @Input() public ghosts: any[];
}
