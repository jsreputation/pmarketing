import { Component, Input } from '@angular/core';
import { MessageService } from '@cl-core-services';

@Component({
  selector: 'cl-copy-link',
  templateUrl: './copy-link.component.html',
  styleUrls: ['./copy-link.component.scss']
})
export class CopyLinkComponent {
  @Input() public link: string;
  constructor(private messageService: MessageService) { }

  public copyInputMessage(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.messageService.show('Link copied to clipboard!', 'success');
  }

}
