import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  constructor(private router: Router) {}
  subTitle = 'Unlock your Netflix Rebate with your BPI Credit Card';
  ngOnInit() {}

  onMoved($event) {
    console.log($event);
  }

  onCompleted() {
    this.router.navigate(['/congrats']);
  }
}
