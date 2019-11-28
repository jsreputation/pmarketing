import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class LoyaltyFormStepReviewComponent implements OnInit, OnDestroy {
  @Input() public group: FormGroup;
  @Input() public dataSource: CustomDataSource<ICustomTireForm>;
  public statusLabel: { [key: string]: StatusLabelConfig };
  protected destroy$: Subject<void> = new Subject();
  public get formValue(): ILoyaltyForm {
    return this.group.value;
  }

  constructor(private configService: ConfigService) {}

  public  ngOnInit(): void {
    this.getStatusesLabel();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getStatusesLabel(): void {
    this.configService.prepareStatusesLabel()
      .pipe(takeUntil(this.destroy$))
      .subscribe((statuses) => {
        this.statusLabel = statuses;
      });
  }

}
