import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-copy-link',
  templateUrl: './copy-link.component.html',
  styleUrls: ['./copy-link.component.scss']
})
export class CopyLinkComponent implements OnInit {
  @Input() public link: string;

  constructor() {
  }

  public copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
