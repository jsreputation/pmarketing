import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomDataSource } from '@cl-shared/table';
import { LoyaltyCustomTierService } from '@cl-core/services/loyalty-custom-tier.service';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { ILoyaltyForm, ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { TranslateService } from '@ngx-translate/core';
import { StatusLabelConfig } from '@cl-shared';

@Component({
  selector: 'cl-loyalty-review',
  templateUrl: './loyalty-review.component.html',
  styleUrls: ['./loyalty-review.component.scss']
})
export class LoyaltyReviewComponent implements OnInit, OnDestroy {
  public loyalty: ILoyaltyForm;
  public customTierDataSource: CustomDataSource<ICustomTireForm>;
  public statusLabel: { [key: string]: StatusLabelConfig };
  protected destroy$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private customTierService: LoyaltyCustomTierService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private loyaltyService: LoyaltyService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.handleRouteParams();
    this.prepareStatusesLabel();
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
      map((params: ParamMap) => params.get('id')),
      tap(id => this.setBasicTierId(id)),
      switchMap(id => this.loyaltyService.getLoyalty(id)),
      takeUntil(this.destroy$),
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
    this.customTierDataSource.filter = { program_id: basicTierId };
  }

  private prepareStatusesLabel(): void {
    combineLatest([this.getTranslation(), this.getStatusLabel()])
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(([translation, statuses]) => {
        Object.values(statuses)
          .forEach((item) => {
            item.title = translation[item.title];
          });
        this.statusLabel = statuses;
      });
  }

  private getTranslation(): Observable<any> {
    return this.translate.get('STATUSES_TYPE');
  }

  private getStatusLabel(): Observable<{ [key: string]: StatusLabelConfig }> {
    return this.loyaltyService.getStatusLable();
  }
}
