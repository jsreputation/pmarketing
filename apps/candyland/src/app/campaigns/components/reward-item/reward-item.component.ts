import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ICampaignOutcome } from '@cl-core/models/campaign/campaign';
import { IOutcome } from '@cl-core/models/outcome/outcome';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'cl-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./reward-item.component.scss'],
})
export class RewardItemComponent implements OnInit, OnChanges {
  @Input() public outcomeData: ICampaignOutcome;
  @Input() public enableProbability: boolean = false;
  @Input() public isInvalid: boolean;
  @Input() public overWriteProb: AbstractControl;

  @Output() private clickDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() private updateOutcome: EventEmitter<{ probability: number, limit: number }> =
    new EventEmitter<{ probability: number, limit: number }>();

  public group: FormGroup = new FormGroup({
    probability: new FormControl(null),
    limit: new FormControl(null)
  }, {updateOn: 'blur'});
  private destroy$: Subject<void> = new Subject();

  public get probability(): AbstractControl {
    return this.group.get('probability');
  }

  public get limit(): AbstractControl {
    return this.group.get('limit');
  }

  public get outcome(): IOutcome {
    return this.outcomeData.outcome;
  }

  public get data(): IRewardEntity {
    return this.outcomeData.reward;
  }

  public ngOnInit(): void {
    this.initForm();
    this.group.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.updateOutcomeData();
      }
    );
  }

  public ngOnChanges({enableProbability}: SimpleChanges): void {
    // update parent form about its current null value when prob disabled so campaign is synced
    if (enableProbability !== undefined && enableProbability.currentValue === false) {
      this.updateOutcomeData(true);
      if (this.overWriteProb) {
        this.updateOutcome.emit({probability: null, limit: null});
      }
    }
    if (this.overWriteProb) {
      this.overWriteProb.valueChanges.pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        (value) => {
          this.updateOutcome.emit({probability: value, limit: null});
        }
      );
    }
  }

  private initForm(): void {
    this.group.patchValue({ probability: this.outcome.probability, limit: this.outcome.limit });
  }

  public updateOutcomeData(resetProb?: boolean): void {
    const updateData = {
      probability: resetProb ? null : (this.group.get('probability').value || null),
      limit: this.group.get('limit').value || null,
    };
    this.updateOutcome.emit(updateData);
  }
  public delete(): void {
    this.clickDelete.emit(this.outcomeData);
  }
}
