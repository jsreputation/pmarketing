import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { CustomDataSource, DataSourceStates } from '@cl-shared/table';
import { LoyaltyAction } from '../../models/loyalty-action.enum';
import { IEngagementItemMenuOption } from '../../components/loyalty-item/loyalty-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'cl-loyalty-list-page',
  templateUrl: './loyalty-list-page.component.html',
  styleUrls: ['./loyalty-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltyListPageComponent implements OnDestroy {
  public loyaltyId: string;
  public loyaltyAction: typeof LoyaltyAction = LoyaltyAction;
  public dataSource: CustomDataSource<any>;
  public dataSourceStates: typeof DataSourceStates = DataSourceStates;
  public menuOptions: IEngagementItemMenuOption[] = [
    {action: this.loyaltyAction.edit, label: 'Edit'},
    {action: this.loyaltyAction.duplicate, label: 'Duplicate'},
    {action: this.loyaltyAction.delete, label: 'Delete'},
  ];
  constructor(
    private loyaltyService: LoyaltyService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.dataSource = new CustomDataSource<any>(this.loyaltyService);
  }

  public ngOnDestroy(): void {}

  /**
   * Forward events
   */
  public menuOptTapped(event: { loyalty: ILoyaltyForm, action: string }): void {
      console.log(event);
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
        this.cd.markForCheck();
      });
  }

  private duplicateLoyalty(loyalty: ILoyaltyForm): void {
    this.loyaltyService.duplicateLoyalty(loyalty)
      .subscribe(result => {
        if (result) {
          this.dataSource.updateData();
          this.cd.markForCheck();
        }
      });
  }
}
