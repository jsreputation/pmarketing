import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-reward-loyalty-setup-group',
  templateUrl: './reward-loyalty-setup-group.component.html',
  styleUrls: ['./reward-loyalty-setup-group.component.scss']
})
export class RewardLoyaltySetupGroupComponent implements OnInit {
  @Input() public loyalty: any;
  @Input() public group: FormGroup;
  @Input() public currency: string;

  public ngOnInit(): void {
  }

  public get tiers(): FormGroup {
    return (this.group.get('tiers') as any).controls;
  }

  public calculateDiscount(index: number): number {
    return this.getDiscount(index) * 100;
  }

  public getDiscount(index: number): number {
    return !this.loyalty.customTiers ? 0 : this.loyalty.customTiers[index].burnDiscount;
  }

  public getPercentCalculate(item: any, index: number): void {
    const valuePoints = item.get('tierValue').value;
    if (!item.get('statusDiscount').value) {
      return valuePoints;
    }
    const value =  Math.floor(1 - this.getDiscount(index) * valuePoints);
    item.get('tireDiscountValue').patchValue(value < 0 ? 0 : value);
  }

}
