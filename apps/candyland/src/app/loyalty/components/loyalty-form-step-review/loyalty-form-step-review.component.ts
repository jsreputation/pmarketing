import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomDataSource } from '@cl-shared/table';
import { ICustomTireForm, ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';

@Component({
  selector: 'cl-loyalty-form-step-review',
  templateUrl: './loyalty-form-step-review.component.html',
  styleUrls: ['./loyalty-form-step-review.component.scss']
})
export class LoyaltyFormStepReviewComponent {
  @Input() public group: FormGroup;
  @Input() public dataSource: CustomDataSource<ICustomTireForm>;

  public get formValue(): ILoyaltyForm {
    return this.group.value;
  }
}
