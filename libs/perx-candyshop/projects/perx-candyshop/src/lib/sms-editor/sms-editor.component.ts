import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OptionConfig } from '../../models/option-config.interface';

@Component({
  selector: 'cs-sms-editor',
  templateUrl: './sms-editor.component.html',
  styleUrls: ['./sms-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmsEditorComponent {
  @Input() public options: OptionConfig;
  @Input() public control: FormControl = new FormControl('');

  public selectShortCode(value: string): void {
    const newValue = this.control.value + ` ${value} `;
    this.control.patchValue(newValue);
  }

}
