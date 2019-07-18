import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-download-link',
  templateUrl: './download-link.component.html',
  styleUrls: ['./download-link.component.scss']
})
export class DownloadLinkComponent implements OnInit {
  @Input() file: string;

  constructor() {
  }

  ngOnInit() {
  }

}
