import { Component, OnInit } from '@angular/core';
import { ILoyaltyTransactionHistory, LoyaltyService } from '@perxtech/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'points-history',
  templateUrl: './point-history.component.html',
  styleUrls: ['./point-history.component.scss']
})
export class PointHistoryComponent implements OnInit {

  public transactions: Observable<ILoyaltyTransactionHistory[]>;
  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.transactions = this.loyaltyService.getTransactionHistory();
  }

}
