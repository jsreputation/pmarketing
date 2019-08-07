import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-sms-editor',
  templateUrl: './sms-editor.component.html',
  styleUrls: ['./sms-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmsEditorComponent implements OnInit {
  @Input() public options: OptionConfig;
  @Input() public control = new FormControl('');

  constructor() {
  }

  public ngOnInit() {
  }

  public selectShortCode(value: string) {
    const newValue = this.control.value + ` ${value} `;
    this.control.patchValue(newValue);
  }

}
