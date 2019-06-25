import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { bufferCount, tap, first, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-shake-game',
  templateUrl: './shake-game.component.html',
  styleUrls: ['./shake-game.component.scss']
})
export class ShakeGameComponent implements OnInit {
  isEnabled = false;

  title = 'Shake the tree and Win!';
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

  done(): void {
    // display a loader before redirecting to next page
    const delay = 3000;
    const nbSteps = 60;
    interval(delay / nbSteps)
      .pipe(
        tap(),
        bufferCount(nbSteps),
        first()
      ).subscribe(() => { this.router.navigate(['/congrats']); });
  }

  ngOnInit() {}

}
