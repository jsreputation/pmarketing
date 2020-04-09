import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'perx-blackcomb-pages-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  public columnsToDisplay = ['ranking', 'nickName', 'points'];

  public rankingImages = [
    'https://cdn.perxtech.io/content/hsbc-hk/images/firstplace.png',
    'https://cdn.perxtech.io/content/hsbc-hk/images/secondplace.png',
    'https://cdn.perxtech.io/content/hsbc-hk/images/thirdplace.png'
  ];

  public myDataArray = [
    {ranking: 1, nickName: 'joker', points: 1},
    {ranking: 2, nickName: 'joker', points: 1},
    {ranking: 3, nickName: 'joker', points: 1},
    {ranking: 4, nickName: 'joker', points: 1},
    {ranking: 5, nickName: 'joker', points: 1},
    {ranking: 6, nickName: 'joker', points: 1},
    {ranking: 7, nickName: 'joker', points: 1},
    {ranking: 8, nickName: 'joker', points: 1},
    {ranking: 9, nickName: 'joker', points: 1},
    {ranking: 10, nickName: 'joker', points: 1},
  ];

  constructor() { }

  ngOnInit() {
  }

}
