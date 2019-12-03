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
  @Output() private clickDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() private updateReward: EventEmitter<{ probability: number, limit: number }> =
    new EventEmitter<{ probability: number, limit: number }>();

  public group: FormGroup = new FormGroup({
    probability: new FormControl({ value: 0, disabled: true }),
    limit: new FormControl({ value: 0 })
  });
  private destroy$: Subject<void> = new Subject();
  public get probability(): AbstractControl {
    return this.group.get('probability');
  }

  public get limit(): AbstractControl {
    return this.group.get('limit');
  }

  public get isInvalid(): boolean {
    return this.group.parent.invalid;
  }

  public ngOnInit(): void {
    console.log(this.data);
    this.group.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.updateRewardData();
      }
    );
  }

  public updateRewardData(): void {
    const updateData = {
      probability: this.group.get('probability').value,
      limit: this.group.get('limit').value
    };
    this.updateReward.emit(updateData);
  }
  public delete(): void {
    this.clickDelete.emit(this.data);
  }
}
