import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomDataSource } from '@cl-shared/table';

@Component({
  selector: 'cl-loyalty-form-step-review',
  templateUrl: './loyalty-form-step-review.component.html',
  styleUrls: ['./loyalty-form-step-review.component.scss']
})
export class LoyaltyFormStepReviewComponent {
  @Input() public group: FormGroup;
  @Input() public dataSource: CustomDataSource<any>;

  public get formValue(): ILoyaltyForm {
    return this.group.value;
  }
}
