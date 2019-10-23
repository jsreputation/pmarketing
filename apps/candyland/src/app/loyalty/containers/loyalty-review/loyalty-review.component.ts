import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomDataSource } from '@cl-shared/table';
import { LoyaltyCustomTierService } from '@cl-core/services/loyalty-custom-tier.service';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoyaltyService } from '@cl-core/services/loyalty.service';

@Component({
  selector: 'cl-loyalty-review',
  templateUrl: './loyalty-review.component.html',
  styleUrls: ['./loyalty-review.component.scss']
})
export class LoyaltyReviewComponent implements OnInit, OnDestroy {
  public loyalty: ILoyaltyForm;
  public customTierDataSource: CustomDataSource<ICustomTireForm>;
  protected destroy$: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute,
              private customTierService: LoyaltyCustomTierService,
              private router: Router,
              private cd: ChangeDetectorRef,
              private loyaltyService: LoyaltyService) {
  }

  public ngOnInit(): void {
    this.handleRouteParams();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public comeBack(): void {
    this.router.navigateByUrl('/loyalty');
  }

  private handleRouteParams(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      map((params: ParamMap) => params.get('id')),
      tap(id => this.setBasicTierId(id)),
      switchMap(id => this.loyaltyService.getLoyalty(id)),
    ).subscribe(data => {
        if (data) {
          this.loyalty = data;
          this.cd.detectChanges();
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

  private setBasicTierId(loyaltyId: string): void {
    this.initCustomTiersDataSource();
    this.setBasicTierIdToCustomTiersDataSourceFilter(loyaltyId);
  }

  private initCustomTiersDataSource(): void {
    if (!this.customTierDataSource) {
      this.customTierDataSource = new CustomDataSource<ICustomTireForm>(this.customTierService);
    }
  }

  private setBasicTierIdToCustomTiersDataSourceFilter(basicTierId: string): void {
    this.customTierDataSource.filter = {program_id: basicTierId};
  }
}
