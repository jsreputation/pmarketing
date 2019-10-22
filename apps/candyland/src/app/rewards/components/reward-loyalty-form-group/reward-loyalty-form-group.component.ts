import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-reward-loyalty-form-group',
  templateUrl: './reward-loyalty-form-group.component.html',
  styleUrls: ['./reward-loyalty-form-group.component.scss']
})
export class RewardLoyaltyFormGroupComponent implements OnInit {
  @Input() public loyalties: any;
  @Input() public form: FormGroup;

  public ngOnInit(): void {
  }

  public getRewardLoyaltyFormItem(index: number): FormGroup {
    if (!this.form) {
      return null;
    }
    return (this.form.controls as any)[index];
  }

}
