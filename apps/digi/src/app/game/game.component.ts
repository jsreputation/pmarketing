import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  isEnabled = false;
  title = 'Hit the Pinata and Win!';
  subTitle = 'Enjoy your Gold membership reward.';
  numberOfTaps = 5;

  constructor(private router: Router) {}

  onTap($event) {
    if ($event.tap >= this.numberOfTaps) {
      setTimeout(() => {
        this.router.navigate(['/congrats']);
      }, 3000);
    }
  }

  ngOnInit() {}
}
