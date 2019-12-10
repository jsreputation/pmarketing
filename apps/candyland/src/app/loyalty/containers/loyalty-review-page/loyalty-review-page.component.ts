import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomDataSource } from '@cl-shared/table';
import { LoyaltyCustomTierService } from '@cl-core/services/loyalty-custom-tier.service';
import { concatMap, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { from, Observable, Subject } from 'rxjs';
import { ICustomTireForm, ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';

import { StatusLabelConfig } from '@cl-shared';
import { ConfigService } from '@cl-core-services';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { LoyaltyRuleService } from '@cl-core/services/loyalty-rule.service';
import { ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';

@Component({
  selector: 'cl-loyalty-review-page',
  templateUrl: './loyalty-review-page.component.html',
  styleUrls: ['./loyalty-review-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltyReviewPageComponent implements OnInit, OnDestroy {
  public loader: boolean = false;
  public loyalty: ILoyaltyForm;
  public customTierDataSource: CustomDataSource<ICustomTireForm>;
  public basicTierRuleSet: ILoyaltyRuleSet;
  public customTierRuleSetMap: { [id: string]: ILoyaltyRuleSet } = {};
  public statusLabel: { [key: string]: StatusLabelConfig };
  protected destroy$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private customTierService: LoyaltyCustomTierService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private configService: ConfigService,
    private loyaltyService: LoyaltyService,
    private ruleService: LoyaltyRuleService,
  ) {
  }

  public ngOnInit(): void {
    this.initStatusesLabel();
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
      map((params: ParamMap) => params.get('id')),
      tap(() => this.loader = true),
      switchMap(id => this.getLoyalty(id)),
      tap((loyalty: ILoyaltyForm) => this.initCustomTiersDataSource(loyalty.id)),
      switchMap((loyalty: ILoyaltyForm) => this.getBasicTierRuleSet(loyalty.basicTierId)),
      switchMap(() => this.getAllCustomTierRuleSet()),
      tap(() => {
        this.loader = false;
        this.cd.detectChanges();
      }),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      },
      (error: Error) => {
        console.warn(error.message);
        this.router.navigateByUrl('/loyalty');
      }
    );
  }

  private getLoyalty(id: string): Observable<any> {
    return this.loyaltyService.getLoyalty(id)
      .pipe(
        tap(loyalty => {
            if (loyalty) {
              this.loyalty = loyalty;
              this.cd.detectChanges();
            } else {
              this.router.navigateByUrl('/loyalty');
            }
          },
        ));
  }

  private initCustomTiersDataSource(id: string): void {
    if (!this.customTierDataSource) {
      this.customTierDataSource = new CustomDataSource<ICustomTireForm>(
        this.customTierService, 20, {'filter[program_id]': id});
    }
  }

  private getBasicTierRuleSet(basicTierId: string): Observable<any> {
    return this.ruleService.findAndCreateRuleSet('Perx::Loyalty::BasicTier', basicTierId)
      .pipe(
        tap(ruleSet => this.basicTierRuleSet = ruleSet),
        takeUntil(this.destroy$)
      );
  }

  private getCustomTierRuleSet(id: string): Observable<any> {
    return this.ruleService.findAndCreateRuleSet('Perx::Loyalty::CustomTier', id)
      .pipe(
        tap(ruleSet => this.customTierRuleSetMap[id] = ruleSet),
      );
  }

  private getAllCustomTierRuleSet(): Observable<any> {
    const customTierIds = this.customTierDataSource.data.map(item => item.id);
    return from(customTierIds).pipe(
      concatMap(id => this.getCustomTierRuleSet(id)),
      filter(Boolean),
      tap(() => this.cd.detectChanges())
    );
  }

  private initStatusesLabel(): void {
    this.configService.prepareStatusesLabel()
      .pipe(takeUntil(this.destroy$))
      .subscribe((statuses) => {
        this.statusLabel = statuses;
      });
  }
}
