import { Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormArray, FormGroup, NgControl } from '@angular/forms';
import { noop, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import Utils from '@cl-helpers/utils';
import { ILoyaltyRuleCondition } from '@cl-core/models/loyalty/loyalty-rules.model';

@Component({
  selector: 'cl-manage-conditions',
  templateUrl: './manage-conditions.component.html',
  styleUrls: ['./manage-conditions.component.scss']
})
export class ManageConditionsComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public conditionTypeOptions: { value: string, title: string, limit?: number }[];
  @Input() public set conditionFormGroupMap(value: { [key: string]: (type: string) => FormGroup }) {
    console.log('set', value);
    this.conditionGroups = value;
  };
  public conditionGroups: { [key: string]: (type: string) => FormGroup };
  @Input() public conditionComponentMap: { [type: string]: any };
  @Input() public config: any;
  @Output() public add: EventEmitter<string> = new EventEmitter<string>();
  @Output() public update: EventEmitter<{ index: number, type: string }> = new EventEmitter<{ index: number, type: string }>();
  @Output() public delete: EventEmitter<number> = new EventEmitter<number>();
  public conditions: FormArray = new FormArray([]);
  public disabledState: boolean = false;
  public isHideAddCondition: boolean = false;
  public conditionTypes: { [value: string]: any } = {};
  private onChange: any = noop;
  private onTouched: any = noop;
  protected destroy$: Subject<void> = new Subject();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    // private cd: ChangeDetectorRef,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    this.handleConditionTypes();

  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addCondition(type: string = 'transaction'): void {
    this.add.emit(type);
    this.conditions.push(this.createConditionFormField(type));
  }

  public deleteCondition(index: number): void {
    this.delete.emit(index);
    this.conditions.removeAt(index);
  }

  public updateCondition(index: number, type: string): void {
    this.update.emit({ index, type });
    const id = this.conditions.at(index).value.id;
    this.conditions.setControl(index, this.createConditionFormField(type));
    if (id) {
      this.conditions.at(index).get('id').patchValue(id);
    }
  }

  public handleConditionTypes(): void {
    this.conditions.valueChanges.pipe(
      tap(conditions => {
        this.onChange(conditions);
        this.onTouched();
      }),
      takeUntil(this.destroy$)
    ).subscribe();
    //   map((conditions) => Utils.uniqValuesMap(conditions, 'type')),
    //   distinctUntilChanged(Utils.isEqual),
    //   map(conditions => this.conditionTypeOptions.map(
    //     conditionType => ({ ...conditionType, hide: this.hideOption(conditionType, conditions) })
    //   )),
    //   tap(conditionsTypes => this.conditionTypes = conditionsTypes),
    //   takeUntil(this.destroy$)
    // ).subscribe(conditionsTypes => this.isHideAddCondition = !!conditionsTypes.find(condition => condition.hide === false));
  }

  public isHideOption(condition: any): boolean {
    return condition.value in this.conditionTypes &&
      'limit' in condition &&
      this.conditionTypes[condition.value] >= condition.limit;
  }

  public hideOption(condition: any, conditions: any): boolean {
    return condition.value in conditions &&
      'limit' in condition && conditions[condition.value] >= condition.limit;
  }

  public createConditionFormField(type: string): FormGroup {
    console.log('conditionGroups', this.conditionGroups);
    return this.conditionGroups ? this.conditionGroups[type](type) as FormGroup : {};
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.conditions.markAsTouched();
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabledState = isDisabled;
    if (isDisabled) {
      this.conditions.disable();
    } else {
      this.conditions.enable();
    }
  }

  public writeValue(value: ILoyaltyRuleCondition[] | null): void {
    console.log('value: ', value);
    if (!value) {
      this.conditions.reset();
      this.addCondition();
      return;
    }

    if (Utils.isArray(value)) {
      value.forEach(() => this.addCondition());
      return;
    }

    console.warn('Error conditions: wrong format of data');
  }
}
