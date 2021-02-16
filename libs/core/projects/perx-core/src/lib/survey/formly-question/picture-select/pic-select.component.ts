import { ChangeDetectionStrategy, Component, QueryList, ViewChildren } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
import { MatCheckbox } from '@angular/material';
// ng-container for when need to extend to single select
@Component({
  selector: 'perx-core-survey-pic-select',
  templateUrl: './pic-select.component.html',
  styleUrls: ['./pic-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveyPictureSelectComponent extends FieldType {
  @ViewChildren(MatCheckbox)
  public checkboxes!: QueryList<MatCheckbox>;

  public onChange(value: any, checked: boolean): void {
    if (this.to.type === 'array') {
      this.formControl.patchValue(
        checked
          ? [...new Set([...(this.formControl.value || []), value])] // when go back qn, dw to double patch
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
