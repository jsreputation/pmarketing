import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cs-copy-link',
  templateUrl: './copy-link.component.html',
  styleUrls: ['./copy-link.component.scss']
})
export class CopyLinkComponent {
  @Input() public link: string;
  @Output() public copied: EventEmitter<string> = new EventEmitter<string>();

  public copyInputMessage(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.copied.emit(this.link);
  }
}
