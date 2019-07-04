import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

const gamesInfo = [{
      title: 'Complete the survey to win an instant reward!',
      subTitle: 'TODO: Survey / Feedback',
      gameType: 'feedback'
    },
    {
      title: 'Hit the Pinata!',
      subTitle: 'Hit the Pinata and win rewards',
      gameType: 'pinata'
    },
    {
      title: 'Tap the Tree!',
      subTitle: 'Tap the tree and win rewards',
      gameType: 'shake-tree'
    },
    {
      title: 'Complete the Puzzle!',
      subTitle: 'Complete the puzzle win rewards',
      gameType: 'puzzle-stamp'
    }
];

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})

export class GamePlayComponent implements OnInit {

  gameId: number;
  title: string;
  subTitle: string;
  gameType: string;
  isEnabled = false;

  // Pinata static Values
  pinataTotalTaps = 2;
  numberOfTaps = 0;
  //

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      if (params.get('id') !== null) {
        this.gameId = Number.parseInt(params.get('id'), 10);
        if (typeof this.gameId !== undefined) {
          this.title = gamesInfo[this.gameId].title;
          this.subTitle = gamesInfo[this.gameId].subTitle;
          this.gameType = gamesInfo[this.gameId].gameType;
          }
      }
    });
  }


  onMoved(id: string) {
    if (id) {
      console.log(id);
    }
  }

  onPinataTap($event) {
    console.log('reward-detail/$this.gameid');
    if ($event.tap >= this.pinataTotalTaps) {
      this.gameCompleted();
    }
  }

  gameCompleted() {
      setTimeout(() => {
        this.router.navigate(['reward-detail/' + this.gameId]);
        this.gameCompleted();
      }, 3000);
  }
}
