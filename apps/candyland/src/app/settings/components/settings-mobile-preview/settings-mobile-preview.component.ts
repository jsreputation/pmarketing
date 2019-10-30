import {
  AfterViewInit,
  Component, EventEmitter,
  Input, Output, ViewChild,
} from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'cl-settings-mobile-preview',
  templateUrl: './settings-mobile-preview.component.html',
  styleUrls: ['./settings-mobile-preview.component.scss']
})
export class SettingsMobilePreviewComponent implements AfterViewInit {
  @ViewChild(MatTabGroup, {static: false}) public matTabGroup: MatTabGroup;

  @Input() public tabs: [string] = null;
  @Output() public animationDone: EventEmitter<void> = new EventEmitter<void>();

  public ngAfterViewInit(): void {
    if (this.matTabGroup) {
      this.matTabGroup.animationDone.subscribe((val => this.animationDone.emit(val)));
    }
  }

}
