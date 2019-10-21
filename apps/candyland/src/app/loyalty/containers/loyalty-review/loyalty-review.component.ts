import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomDataSource } from '@cl-shared/table';
import { LoyaltyCustomTierService } from '@cl-core/services/loyalty-custom-tier.service';

@Component({
  selector: 'cl-loyalty-review',
  templateUrl: './loyalty-review.component.html',
  styleUrls: ['./loyalty-review.component.scss']
})
export class LoyaltyReviewComponent implements OnInit {
  public loyalty: ILoyaltyForm;
  public customTierDataSource: CustomDataSource<any>;

  constructor(private route: ActivatedRoute,
              private customTierService: LoyaltyCustomTierService,
              private router: Router) {
    this.customTierDataSource = new CustomDataSource<any>(this.customTierService);
  }

  public ngOnInit(): void {
    const id = this.getIdLoyalty();
    this.getLoyalty(id);
  }

  public comeBack(): void {
    this.router.navigateByUrl('/loyalty');
  }

  private getIdLoyalty(): string {
    return this.route.snapshot.params.id;
  }

  private getLoyalty(loyaltyId: string): void {
    // TODO: get loyalty
    console.log(loyaltyId);
    this.loyalty = {
      name: 'telco',
      status: 'draft',
      details: {
        pointsName: 'All-IT Points',
        imageUrl: 'https://www.gettyimages.co.uk/gi-resources/images/RoyaltyFree/Apr17Update/ColourSurge1.jpg',
        joinMethod: {
          transactionAmount: true,
          amount: 555,
          signUp: true,
          inviteOnly: true
        },
        poolId: null
      },
      tiersConversions: {
        globalEarnRule: {amount: 2, points: 10},
        globalBurnRule: {amount: 20, points: 2},
        pointsExpiry: {
          amount: 55,
          type: 'days',
          trigger: ''
        },
        tiers: []
      }
    };
  }
}
