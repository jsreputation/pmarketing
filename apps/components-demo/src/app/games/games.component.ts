import { Component } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  public navLinks = [
    { path: 'shake', label: 'Shake' },
    { path: 'tap', label: 'Tap' }
  ];
}
