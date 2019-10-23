import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-view-global-earn-burn-rules',
  templateUrl: './view-global-earn-burn-rules.component.html',
  styleUrls: ['./view-global-earn-burn-rules.component.scss']
})
export class ViewGlobalEarnBurnRulesComponent {
  @Input() public loyalty: ILoyaltyForm;
  @Input() public currency: any;

}
