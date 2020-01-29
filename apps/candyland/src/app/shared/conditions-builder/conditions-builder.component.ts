import {
  ChangeDetectorRef,
  Component, Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import Utils from 'src/app/helpers/utils';
import { ILoyaltyRuleCondition } from 'src/app/core/models/loyalty/loyalty-rules.model';
import { ConditionsBuilderFormsService } from './conditions-builder-forms.service';
import { RuleConditionType } from '@cl-core/models/loyalty/rule-condition-type.enum';
import {
  CONDITION_BUILDER_COMPONENT_MAP,
  IConditionsBuilderComponentMap,
  IConditionsBuilderConfig,
  IRuleConditionOption
} from './conditions-builder.models';


@Component({
  selector: 'cl-conditions-builder',
  templateUrl: './conditions-builder.component.html',
  styleUrls: ['./conditions-builder.component.scss']
})
export class ConditionsBuilderComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public config: IConditionsBuilderConfig;
  public availableTypeOptions: IRuleConditionOption[];
  public availableTypeOptionsArray: IRuleConditionOption[][];
  public groupMap: { [key: string]: (type: string) => FormGroup };
  public conditions: FormArray = new FormArray([]);
  public disabledState: boolean = false;
  public onChange: any = () => {
  }
  public onTouched: any = () => {
  }
  protected destroy$: Subject<void> = new Subject();

  private get control(): FormControl | null {
    return this.ngControl ? this.ngControl.control as FormControl : null;
  }

  constructor(
    @Inject(CONDITION_BUILDER_COMPONENT_MAP) public componentMap: IConditionsBuilderComponentMap,
    private conditionsBuilderService: ConditionsBuilderFormsService,
    private cd: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.groupMap = this.conditionsBuilderService.groupMap;
  }

  public ngOnInit(): void {
    this.overrideMarkAsTouchedFunction();
    this.setAvailableTypeOptions(this.conditions.value || null);
    this.handleConditionChanges();
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

  public handleConditionChanges(): void {
    this.conditions.valueChanges.pipe(
      distinctUntilChanged(Utils.isEqual),
      takeUntil(this.destroy$)
    ).subscribe(conditions => {
      this.onChange(conditions);
      this.onTouched();
      this.setAvailableTypeOptions(conditions);
      this.setInnerErrorOutside();
    });
  }

  public createConditionFormField(type: string): FormGroup {
    return this.groupMap[type](type) as FormGroup;
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
      this.conditions.patchValue(value);
      this.conditions.updateValueAndValidity();
      this.cd.detectChanges();
      return;
    }

    console.warn('Error conditions: wrong format of data');
  }

  private setAvailableTypeOptions(conditions: any[] | null): void {
    const uniqTypesMap = Utils.uniqValuesMap(conditions, 'type');
    if (conditions && conditions.length > 1) {
      this.availableTypeOptions = this.config.conditionType.filter(
        option => !('limit' in option) || !option.limit || !(option.value in uniqTypesMap) || option.limit > uniqTypesMap[option.value]
      );
      this.availableTypeOptionsArray = conditions.map(
        condition => this.config.conditionType.filter(
          option => option.value === condition.type || !('limit' in option) ||
            !option.limit || !(option.value in uniqTypesMap) || option.limit > uniqTypesMap[option.value]
        ));
    } else {
      this.availableTypeOptions = this.config.conditionType;
      this.availableTypeOptionsArray = [this.config.conditionType];
    }
  }

  // listening callback markAsTouched from external control
  private overrideMarkAsTouchedFunction(): void {
    if (this.control) {
      this.control.markAsTouched = () => {
        this.conditions.markAllAsTouched();
      };
    }
  }

  // TODO: this must be changed to custom validator for ConditionsBuilder
  private setInnerErrorOutside(): void {
    if (this.control && this.conditions.invalid) {
      this.control.setErrors({innerError: true});
    } else {
      this.control.setErrors({});
      this.control.updateValueAndValidity();
    }
  }

}
