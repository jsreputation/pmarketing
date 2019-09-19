import { Component, OnInit } from '@angular/core';
import { LoyaltyService, ITransaction } from '@perx/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public transactions: Observable<ITransaction[]>;
  public priceLabelFn: (tr: ITransaction) => string;
  public membershipId: number;

  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.transactions = this.loyaltyService.getAllTransactions();

    this.priceLabelFn = (tr: ITransaction) => `Points ${tr.points < 0 ? 'spent' : 'earned'}`;

    this.loyaltyService.getLoyalties().pipe(
      map(loyalties => loyalties && loyalties.length > 0 && loyalties[0])
    ).subscribe( (loyalty) => {
      this.membershipId = +loyalty.membershipIdentifier;
    });
  }
}
