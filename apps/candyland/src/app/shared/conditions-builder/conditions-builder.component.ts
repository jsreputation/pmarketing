import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormArray, FormGroup, NgControl } from '@angular/forms';
import { noop, Subject } from 'rxjs';
import { distinctUntilChanged, startWith, takeUntil } from 'rxjs/operators';
import Utils from 'src/app/helpers/utils';
import { ILoyaltyRuleCondition } from 'src/app/core/models/loyalty/loyalty-rules.model';
import { ConditionsBuilderService } from './conditions-builder.service';
import { RuleConditionType } from '@cl-core/models/loyalty/rule-condition-type.enum';

@Component({
  selector: 'cl-conditions-builder',
  templateUrl: './conditions-builder.component.html',
  styleUrls: ['./conditions-builder.component.scss']
})
export class ConditionsBuilderComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public config: {
    conditionType: { value: string, title: string, limit?: number }[];
    [key: string]: any;
  };
  public avaibleTypeOptions: { value: string, title: string, limit?: number }[];
  public avaibleTypeOptionsArray: { value: string, title: string, limit?: number }[][];
  public groupMap: { [key: string]: (type: string) => FormGroup };
  public componentMap: { [type: string]: any };
  public conditions: FormArray = new FormArray([]);
  public disabledState: boolean = false;
  private onChange: any = noop;
  private onTouched: any = noop;
  protected destroy$: Subject<void> = new Subject();

  constructor(
    private conditionsBuilderService: ConditionsBuilderService,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    this.groupMap = this.conditionsBuilderService.groupMap;
    this.componentMap = this.conditionsBuilderService.componentMap;
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

  public addCondition(type: string = RuleConditionType.transaction): void {
    this.conditions.push(this.createConditionFormField(type));
  }

  public deleteCondition(index: number): void {
    this.conditions.removeAt(index);
  }

  public updateCondition(index: number, type: string): void {
    const id = this.conditions.at(index).value.id;
    this.conditions.setControl(index, this.createConditionFormField(type));
    if (id) {
      this.conditions.at(index).get('id').patchValue(id);
    }
  }

  public handleConditionTypes(): void {
    this.conditions.valueChanges.pipe(
      distinctUntilChanged(Utils.isEqual),
      startWith([]),
      takeUntil(this.destroy$)
    ).subscribe(conditions => {
      this.onChange(conditions);
      this.onTouched();
      this.setAvaibleTypeOptions(conditions);
    });
  }

  private setAvaibleTypeOptions(conditions: any[] | null): void {
    const uniqTypesMap = Utils.uniqValuesMap(conditions, 'type');
    if (conditions && conditions.length > 1) {
      this.avaibleTypeOptions = this.config.conditionType.filter(
        option => !('limit' in option) || !option.limit || !(option.value in uniqTypesMap) || option.limit > uniqTypesMap[option.value]
      );
      this.avaibleTypeOptionsArray = conditions.map(
        condition => this.config.conditionType.filter(
          option => option.value === condition.type || !('limit' in option) ||
            !option.limit || !(option.value in uniqTypesMap) || option.limit > uniqTypesMap[option.value]
        ));
    } else {
      this.avaibleTypeOptions = this.config.conditionType;
      this.avaibleTypeOptionsArray = [this.config.conditionType];
    }
  }

  public createConditionFormField(type: string): FormGroup {
    const ctrl = this.groupMap[type](type) as FormGroup;
    return ctrl;
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
    if (!value) {
      this.conditions.reset();
      return;
    }

    if (Utils.isArray(value)) {
      value.forEach((item: any) => this.addCondition(item.type));
      this.conditions.patchValue(value, {emitEvent: false});
      return;
    }

    console.warn('Error conditions: wrong format of data');
  }
}
