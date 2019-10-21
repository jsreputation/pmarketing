import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomDataSource } from '@cl-shared/table';
import { LoyaltyCustomTierService } from '@cl-core/services/loyalty-custom-tier.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoyaltyService } from '@cl-core/services/loyalty.service';

@Component({
  selector: 'cl-loyalty-review',
  templateUrl: './loyalty-review.component.html',
  styleUrls: ['./loyalty-review.component.scss']
})
export class LoyaltyReviewComponent implements OnInit, OnDestroy {
  public loyalty: ILoyaltyForm;
  public customTierDataSource: CustomDataSource<any>;

  constructor(private route: ActivatedRoute,
              private customTierService: LoyaltyCustomTierService,
              private router: Router,
              private loyaltyService: LoyaltyService) {
    this.customTierDataSource = new CustomDataSource<any>(this.customTierService);
  }

  public ngOnInit(): void {
    this.handleRouteParams();
  }
  public ngOnDestroy(): void {
  }

  public comeBack(): void {
    this.router.navigateByUrl('/loyalty');
  }

  private handleRouteParams(): void {
    this.route.paramMap.pipe(
      untilDestroyed(this),
      map((params: ParamMap) => params.get('id')),
      switchMap(id => {
        if (id) {
          return this.loyaltyService.getLoyalty(id);
        }
        return of(null);
      }),
    ).subscribe(data => {
        if (data) {
          this.loyalty = data;
          console.log(this.loyalty);
        } else {
          this.router.navigateByUrl('/loyalty');
        }
      },
      (error: Error) => {
        console.warn(error.message);
        this.router.navigateByUrl('/loyalty');
      }
    );
  }
}
