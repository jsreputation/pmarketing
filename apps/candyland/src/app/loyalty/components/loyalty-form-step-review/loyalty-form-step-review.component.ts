import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomDataSource } from '@cl-shared/table';
import { ICustomTireForm, ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { StatusLabelConfig } from '@cl-shared';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigService } from '@cl-core-services';

@Component({
  selector: 'cl-loyalty-form-step-review',
  templateUrl: './loyalty-form-step-review.component.html',
  styleUrls: ['./loyalty-form-step-review.component.scss']
})
export class LoyaltyFormStepReviewComponent {
  @Input() public group: FormGroup;
  @Input() public dataSource: CustomDataSource<ICustomTireForm>;
  public statusLabel: { [key: string]: StatusLabelConfig };
  protected destroy$: Subject<void> = new Subject();
  public get formValue(): ILoyaltyForm {
    return this.group.value;
  }

  constructor(private configService: ConfigService) {
    this.getStatusesLabel();
  }

  private getStatusesLabel(): void {
    this.configService.prepareStatusesLabel()
      .pipe(takeUntil(this.destroy$))
      .subscribe((statuses) => {
        this.statusLabel = statuses;
      });
  }
}
