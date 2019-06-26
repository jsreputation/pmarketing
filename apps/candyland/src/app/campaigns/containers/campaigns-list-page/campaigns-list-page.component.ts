import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cl-campaigns-list-page',
  templateUrl: './campaigns-list-page.component.html',
  styleUrls: ['./campaigns-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsListPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
