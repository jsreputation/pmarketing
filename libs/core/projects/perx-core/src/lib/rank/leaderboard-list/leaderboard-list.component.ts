import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IVoucher } from '../../vouchers/models/voucher.model';

@Component({
  selector: 'perx-core-leaderboard-list',
  templateUrl: './leaderboard-list.component.html',
  styleUrls: ['./leaderboard-list.component.scss']
})
export class LeaderboardListComponent {

  @Input('data') public vouchers$: Observable<IVoucher[]>;

  constructor() { }

}
