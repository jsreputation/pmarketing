import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cl-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./reward-item.component.scss'],
})
export class RewardItemComponent implements OnInit {
  @Input() public data: IRewardEntity;
  @Input() public enableProbability: boolean = false;
  @Input() public isInvalid: boolean;
  @Output() private clickDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() private updateOutcome: EventEmitter<{ probability: number, limit: number }> =
    new EventEmitter<{ probability: number, limit: number }>();

  public group: FormGroup = new FormGroup({
    probability: new FormControl(),
    limit: new FormControl()
  });
  private destroy$: Subject<void> = new Subject();
  public get probability(): AbstractControl {
    return this.group.get('probability');
  }

  public get limit(): AbstractControl {
    return this.group.get('limit');
  }

  public ngOnInit(): void {
    this.group.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.updateOutcomeData();
      }
    );
  }

  public updateOutcomeData(): void {
    const updateData = {
      probability: this.group.get('probability').value || null,
      limit: this.group.get('limit').value || null
    };
    this.updateOutcome.emit(updateData);
  }
  public delete(): void {
    this.clickDelete.emit(this.data);
  }
}
