import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../notification.service';
import { PopUpClosedCallBack } from '@perx/core/dist/perx-core';

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

export class GamePlayComponent implements OnInit , PopUpClosedCallBack {

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
              private route: ActivatedRoute,
              private notificationService: NotificationService
              ) {}

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
    if ($event.tap >= this.pinataTotalTaps) {
      this.gameCompleted();
    }
  }

  dialogClosed(): void {
    this.router.navigate(['home/']);
  }


  gameCompleted() {
    setTimeout(() => {
      this.notificationService.addPopup({
        // tslint:disable-next-line: max-line-length
        title: 'Congratulations!',
        text: 'You just won 2 rewards',
        buttonTxt: 'View Rewards',
        imageUrl: 'assets/congrats_image.png' ,
        afterClosedCallBack: this
      });
    }, 2000);
  }
}
