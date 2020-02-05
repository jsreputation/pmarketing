import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-sms-editor',
  templateUrl: './sms-editor.component.html',
  styleUrls: ['./sms-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmsEditorComponent {
  @Input() public options: OptionConfig;
  @Input() public control: FormControl = new FormControl('');

  public selectShortCode(value: string): void {
    const tempValue = this.control.value ? this.control.value : '';
    const newValue = `${tempValue  } ${value} `;
    this.control.patchValue(newValue);
  }

}
