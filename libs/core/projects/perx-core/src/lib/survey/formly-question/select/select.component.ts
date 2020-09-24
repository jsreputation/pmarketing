import { ChangeDetectionStrategy, Component, QueryList, ViewChildren } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'perx-core-survey-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveySelectComponent extends FieldType {
  @ViewChildren(MatCheckbox)
  public checkboxes!: QueryList<MatCheckbox>;

  public onChange(value: any, checked: boolean): void {
    if (this.to.type === 'array') {
      this.formControl.patchValue(
        checked
          ? [...new Set([...(this.formControl.value || []), value])]
          : [...(this.formControl.value || [])].filter((o) => o !== value),
      );
    } else {
      this.formControl.patchValue({ ...this.formControl.value, [value]: checked });
    }
    this.formControl.markAsTouched();
  }

  public onContainerClick(event: MouseEvent): void {
    if (this.checkboxes.length) {
      this.checkboxes.first.focus();
    }
    super.onContainerClick(event);
  }

  public isChecked(option: any): boolean {
    const value = this.formControl.value;

    return value && (this.to.type === 'array' ? value.indexOf(option.value) !== -1 : value[option.value]);
  }
}
