import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  playing = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  done(): void {
    this.router.navigate(['/congrats']);
  }
}
