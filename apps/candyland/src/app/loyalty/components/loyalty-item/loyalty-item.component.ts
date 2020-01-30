import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StatusLabel } from '@cl-helpers/status-label.enum';
import { LoyaltyAction } from '../../models/loyalty-action.enum';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { IStatusLabelConfig } from '@perx/candyshop';

export interface IEngagementItemMenuOption {
  action: string;
  label?: string;
}

@Component({
  selector: 'cl-loyalty-item',
  templateUrl: './loyalty-item.component.html',
  styleUrls: ['./loyalty-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltyItemComponent {
  @Input() public data: ILoyaltyForm;
  @Input() public menuOptions: IEngagementItemMenuOption[] = [];
  @Input() public linkable: boolean = false;
  @Input() public statusLabel: IStatusLabelConfig;
  @Output() public menuTapped: EventEmitter<{ loyalty: ILoyaltyForm, action: string }> = new EventEmitter();
  public statusType: typeof StatusLabel = StatusLabel;
  public loyaltyAction: typeof LoyaltyAction = LoyaltyAction;

  constructor(private router: Router) {
  }

  public tapped(option: IEngagementItemMenuOption): void {
    this.menuTapped.emit({action: option.action, loyalty: this.data});
  }

  public navigateToReview(): void {
    if (this.linkable) {
      this.router.navigate(['loyalty/review/' + this.data.id]);
    }
  }
}
