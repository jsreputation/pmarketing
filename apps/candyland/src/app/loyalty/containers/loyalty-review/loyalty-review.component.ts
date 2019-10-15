import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cl-loyalty-review',
  templateUrl: './loyalty-review.component.html',
  styleUrls: ['./loyalty-review.component.scss']
})
export class LoyaltyReviewComponent implements OnInit {
  public loyalty: any;
  constructor(private route: ActivatedRoute,
              private router: Router) { }

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
    this.loyalty = {
      name: 'telco',
      stepDetails: {
        pointsName: 'All-IT Points',
        mainImage: 'https://www.gettyimages.co.uk/gi-resources/images/RoyaltyFree/Apr17Update/ColourSurge1.jpg',
        joiningMethod: {
          transactionAmount: true,
          amount: loyaltyId,
          signUp: true,
          byInvite: true
        },
        selectAudience:
          {
            audienceType: 'all-audience',
            allMyAudience: null,
            uploadFile: null}
      },
      TiersConversions: {
        globalEarnRule: {amount: 2, points: 10},
        globalBurnRule: {amount: 20, points: 2},
        pointsExpiry: {
          pointWasEarnedAmount: 1,
          pointWasEarnedPeriod: 'days',
          userInactivityAmount: 1,
          userInactivityPeriod: 'days'
        },
        tiers: []
      }
    };
  }
}
