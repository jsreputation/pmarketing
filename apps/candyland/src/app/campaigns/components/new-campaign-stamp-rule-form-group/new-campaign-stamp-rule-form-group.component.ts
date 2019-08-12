import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  forwardRef, AfterViewInit
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ToggleControlConfig } from '@cl-core/models/toggle-control-config.interface';
import { ToggleControlService } from '@cl-shared/providers/toggle-control.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { noop } from 'rxjs';

@Component({
  selector: 'cl-new-campaign-stamp-rule-form-group',
  templateUrl: './new-campaign-stamp-rule-form-group.component.html',
  styleUrls: ['./new-campaign-stamp-rule-form-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewCampaignStampRuleFormGroupComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignStampRuleFormGroupComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
  config = {
    ruleType: [
      {'title': 'Transaction', 'value': 'transaction'},
      {'title': 'First login', 'value': 'First login'},
      {'title': 'Sign up', 'value': 'Sign up'},
      {'title': 'Purchase', 'value': 'purchase'},
      {'title': 'Review', 'value': 'review'},
      {'title': 'Referral', 'value': 'Referral'},
      {'title': 'Reward redeemed', 'value': 'Reward redeemed'},
      {'title': 'Bill payment', 'value': 'Bill payment'}
    ],
    rule: [
      {'title': 'is more than', 'value': 'isMoreThan'},
      {'title': 'is less than', 'value': 'isLessThan'},
      {'title': 'is equal to', 'value': 'isEqualTo'}
    ],
    product: [
      {'title': 'Product A', 'value': 'productA'},
      {'title': 'Product B', 'value': 'productB'},
      {'title': 'Product C', 'value': 'productC'}
    ]
  };
  // TODO: integrate when global settings are implemented
  @Input() public currencyID = 'SGD';
  @Input() public group: FormGroup;
  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;

  constructor(public cd: ChangeDetectorRef,
              public dialog: MatDialog,
              private toggleControlService: ToggleControlService,
              private fb: FormBuilder) {
    this.initGroup();
  }

  public ngAfterViewInit() {
    this.group.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.onChange(value);
        debugger;
        const toggleConfig = this.getToggleConfig(this.group);
        this.toggleControlService.updateFormStructure(toggleConfig);
        if (this.toggleControlService.formChanged) {
          this.updateGroup();
        }
      });
    this.group.patchValue(this.getDefaultValue());
  }

  ngOnDestroy(): void {
  }

  private initGroup() {
    this.group = this.fb.group({
      ruleType: ['transaction'],
      condition: this.fb.group({
        rule: ['isMoreThan'],
        value: [0]
      }),
      product: ['productA']
    });
  }

  private updateGroup() {
    this.group.updateValueAndValidity();
    this.cd.detectChanges();
  }

  public getToggleConfig(form: FormGroup): ToggleControlConfig[] {
    return [
      {
        condition: form.get('ruleType').value === 'transaction',
        controls: [form.get('condition')],
      },
      {
        condition: form.get('ruleType').value === 'purchase' || form.get('ruleType').value === 'review',
        controls: [form.get('product')],
      },
    ];
  }

  private getDefaultValue() {
    return {
      ruleType: 'transaction',
      condition: {
        rule: 'isMoreThan',
        value: 0
      },
      product: 'productA'
    };
  }

  writeValue(data: any): void {
    console.log('writeValue', data);
    if (data === null) {
      this.group.patchValue(this.getDefaultValue(), {emitEvent: false});
    }
    // this.group.patchValue(data, {emitEvent: false});
    // this.group.updateValueAndValidity();
    // this.cd.detectChanges();
    // this.updateGroup();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.group.markAsTouched();
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.group.disable();
    } else {
      this.group.enable();
    }
  }

}
