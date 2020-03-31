import { Component, Input } from '@angular/core';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { IStatusLabelConfig } from '@perxtech/candyshop';

@Component({
  selector: 'cl-view-scheme-info',
  templateUrl: './view-scheme-info.component.html',
  styleUrls: ['./view-scheme-info.component.scss']
})
export class ViewSchemeInfoComponent {
  @Input() public loyalty: ILoyaltyForm;
  @Input() public currency: string;
  @Input() public statusLabel: IStatusLabelConfig;
}
