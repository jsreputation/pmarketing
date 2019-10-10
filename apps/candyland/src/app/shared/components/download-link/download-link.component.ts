import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-download-link',
  templateUrl: './download-link.component.html',
  styleUrls: ['./download-link.component.scss']
})
export class DownloadLinkComponent {
  @Input() public file: string;
}
