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
  @ViewChildren(MatCheckbox) checkboxes!: QueryList<MatCheckbox>;

  defaultOptions = {
    templateOptions: {
      hideFieldUnderline: true,
      floatLabel: 'always',
      options: [],
      color: 'accent', // workaround for https://github.com/angular/components/issues/18465
    },
  };

  onChange(value: any, checked: boolean) {
    if (this.to.type === 'array') {
      this.formControl.patchValue(
        checked
          ? [...(this.formControl.value || []), value]
          : [...(this.formControl.value || [])].filter((o) => o !== value),
      );
    } else {
      this.formControl.patchValue({ ...this.formControl.value, [value]: checked });
    }
    this.formControl.markAsTouched();
  }

  onContainerClick(event: MouseEvent): void {
    if (this.checkboxes.length) {
      this.checkboxes.first.focus();
    }
    super.onContainerClick(event);
  }

  isChecked(option: any) {
    const value = this.formControl.value;

    return value && (this.to.type === 'array' ? value.indexOf(option.value) !== -1 : value[option.value]);
  }
}
