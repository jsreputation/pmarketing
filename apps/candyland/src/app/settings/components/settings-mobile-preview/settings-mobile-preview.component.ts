import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'cl-settings-mobile-preview',
  templateUrl: './settings-mobile-preview.component.html',
  styleUrls: ['./settings-mobile-preview.component.scss']
})
export class SettingsMobilePreviewComponent {
  @Input() public tabs: [string] = null;
}
