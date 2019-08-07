import {Component, Input} from '@angular/core';

@Component({
  selector: 'cl-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss']
})
export class DownloadButtonComponent {
  @Input() public file: any;

}
