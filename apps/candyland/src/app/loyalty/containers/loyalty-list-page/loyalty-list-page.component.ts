import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { CustomDataSource, DataSourceStates, DataSourceUpdateSchema } from '@cl-shared/table';
import { LoyaltyAction } from '../../models/loyalty-action.enum';
import { IEngagementItemMenuOption } from '../../components/loyalty-item/loyalty-item.component';
import { Router } from '@angular/router';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { StatusLabelConfig } from '@cl-shared';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigService } from '@cl-core-services';

@Component({
  selector: 'cl-loyalty-list-page',
  templateUrl: './loyalty-list-page.component.html',
  styleUrls: ['./loyalty-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltyListPageComponent implements OnInit, OnDestroy {
  public loyaltyId: string;
  public loyaltyAction: typeof LoyaltyAction = LoyaltyAction;
  public dataSource: CustomDataSource<ILoyaltyForm>;
  public dataSourceStates: typeof DataSourceStates = DataSourceStates;
  public menuOptions: IEngagementItemMenuOption[] = [
    {action: this.loyaltyAction.edit, label: 'BTN_EDIT'},
    {action: this.loyaltyAction.duplicate, label: 'BTN_DUPLICATE'},
    {action: this.loyaltyAction.delete, label: 'BTN_DELETE'},
  ];
  public statusLabel: { [key: string]: StatusLabelConfig };
  private destroy$: Subject<void> = new Subject();
  constructor(
    private loyaltyService: LoyaltyService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private configService: ConfigService
  ) {
    this.dataSource = new CustomDataSource<ILoyaltyForm>(this.loyaltyService);
  }

  public ngOnInit(): void {
    this.getStatusesLabel();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Forward events
   */
  public menuOptTapped(event: { loyalty: ILoyaltyForm, action: string }): void {
    this.handlerMenuEvents(event);
  }

  private handlerMenuEvents(event: { loyalty: ILoyaltyForm, action: string }): void {
    switch (event.action) {
      case this.loyaltyAction.edit:
        this.navigateToEdit(event.loyalty.id);
        break;
      case this.loyaltyAction.delete:
        this.deleteLoyalty(event.loyalty.id);
        break;
      case this.loyaltyAction.duplicate:
        this.duplicateLoyalty(event.loyalty);
        break;
      case this.loyaltyAction.activate:
        this.updateLoyaltyStatus(event.loyalty.id, this.loyaltyAction.activate);
        break;
      case this.loyaltyAction.pause:
        this.updateLoyaltyStatus(event.loyalty.id,  this.loyaltyAction.pause);
        break;
    }
  }

  private navigateToEdit(id: string): void {
    if (id) {
      this.router.navigate(['loyalty/edit/' + id]);
    }
  }

  private deleteLoyalty(id: string): void {
    this.loyaltyService.deleteLoyalty(id)
      .subscribe(() => {
        this.dataSource.updateData();
        this.cd.detectChanges();
      });
  }

  private duplicateLoyalty(loyalty: ILoyaltyForm): void {
    this.loyaltyService.duplicateLoyalty(loyalty)
      .subscribe(result => {
        if (result) {
          this.dataSource.updateData();
          this.cd.detectChanges();
        }
      });
  }

  private updateLoyaltyStatus(loyaltyId: string, newStatus: LoyaltyAction): void {
    this.loyaltyService.updateLoyaltyStatus(loyaltyId, newStatus)
      .subscribe(() => {
        this.dataSource.updateData(DataSourceUpdateSchema.currentPage);
        this.cd.detectChanges();
      });
  }

  private getStatusesLabel(): void {
    this.configService.prepareStatusesLabel()
      .pipe(takeUntil(this.destroy$))
      .subscribe((statuses) => {
        this.statusLabel = statuses;
      });
  }
}
