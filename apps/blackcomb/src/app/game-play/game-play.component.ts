import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  PopUpClosedCallBack,
  NotificationService,
  PuzzleCollectStamp,
  PuzzleCollectReward,
  PUZZLE_COLLECT_STAMP_STATE
} from '@perx/core';

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
},
{
  title: 'Scratch & Win!',
  subTitle: 'Collect all 10 stickers and win a reward!',
  gameType: 'puzzle-collect-stamp'
}

];

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})

export class GamePlayComponent implements OnInit, PopUpClosedCallBack {

  public gameId: number;
  public title: string;
  public subTitle: string;
  public gameType: string;
  public isEnabled: boolean = false;

  // Pinata static Values
  public pinataTotalTaps: number = 2;

  // For static stamp card input values
  public stamps: PuzzleCollectStamp[] = [{ id: 1, state: PUZZLE_COLLECT_STAMP_STATE.redeemed },
  { id: 2, state: PUZZLE_COLLECT_STAMP_STATE.redeemed },
  { id: 3, state: PUZZLE_COLLECT_STAMP_STATE.redeemed },
  { id: 3, state: PUZZLE_COLLECT_STAMP_STATE.issued }];

  public rewards: PuzzleCollectReward[] = [{ rewardPosition: 0 },
  { rewardPosition: 2 }];

  public congratsDetailText: string = 'You just won 2 rewards';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
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

  public onMoved(id: string): void {
    if (id) {
      console.log(id);
    }
  }

  public dialogClosed(): void {
    this.router.navigate(['home/']);
  }

  public gameCompleted(): void {
    setTimeout(() => {
      this.notificationService.addPopup({
        title: 'Congratulations!',
        text: this.congratsDetailText,
        buttonTxt: 'View Rewards',
        imageUrl: 'assets/congrats_image.png',
        afterClosedCallBack: this
      });
    }, 2000);
  }

  public onStampClicked(stamp: PuzzleCollectStamp): void {
    console.log(`Stamp: ${stamp.state}`);
  }
}
