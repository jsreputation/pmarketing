import { Component, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Directive({selector: '[csCopyLinkButton]'})
export class CopyLinkButtonDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Component({
  selector: 'cs-copy-link',
  templateUrl: './copy-link.component.html',
  styleUrls: ['./copy-link.component.scss']
})
export class CopyLinkComponent {
  @Input() public link: string;
  @Output() public copied: EventEmitter<string> = new EventEmitter<string>();
  @ContentChild(CopyLinkButtonDirective, {static: false}) public button: CopyLinkButtonDirective;

  public copyInputMessage(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.copied.emit(this.link);
  }
}
