import { Component, OnInit } from '@angular/core';
import { Voucher } from '@perx/core';
import { GameOutcomeService } from './game-outcome/game-outcome.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  public vouchers: Voucher[];

  constructor(
    private gameOutcomeService: GameOutcomeService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.vouchers = this.gameOutcomeService.getVouchersRewarded();
  }

  public navigateToRewards(): void {
    this.gameOutcomeService.clearVoucherList();
    this.router.navigateByUrl('/home/vouchers');
  }
}
