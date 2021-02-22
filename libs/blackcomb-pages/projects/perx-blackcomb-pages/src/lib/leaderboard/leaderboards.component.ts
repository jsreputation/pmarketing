import { Component, OnInit } from '@angular/core';
import {
  IRankService,
  LeaderBoard
} from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})


export class LeaderboardsComponent implements OnInit {

  public leaderboards: LeaderBoard[];
  public repeatGhostCount: number = 10;
  public ghostTimeOut: boolean;

  public constructor(
    private rankService: IRankService) {
    // this.rankService.getLeaderBoards().subscribe(console.log);
    this.rankService.getLeaderBoards().subscribe((leaderboards) => this.leaderboards = leaderboards);
  }
  public ngOnInit(): void {
    // this.leaderboards$ = this.rankService.getLeaderBoards();
  }


  public onScroll(): void {
    // this.currentPage = this.currentPage + 1;
    // if (this.completed) {
    //   return;
    // }
    // forkJoin(
    //   this.vouchers$,
    //   this.vouchersService.getFromPage(this.currentPage)
    // ).subscribe((val) => {
    //   if (!val[1].length && val[1].length < REQ_PAGE_SIZE) {
    //     this.completed = true;
    //   }
    //   this.vouchers$ = of([...val[0], ...val[1]]);
    // });

  }

  // public isVoucherQueryComplete(vouchers: IVoucher[] | null): boolean {
  //   return Array.isArray(vouchers) || this.ghostTimeOut;
  // }

}
